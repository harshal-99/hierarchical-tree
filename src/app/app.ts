import {Component, OnInit, signal} from '@angular/core';
import {TreeMap, TreeNode} from './tree/tree.type';
import {Tree} from './tree/tree';

@Component({
  selector: 'app-root',
  imports: [Tree],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  rootNode = signal<TreeNode | null>(null);

  private treeMap: TreeMap = {
    a: ['b', 'c'],
    b: ['d', 'e'],
    c: ['f', 'g'],
    e: ['h', 'i'],
    f: ['j', 'k']
  } as const;

  ngOnInit(): void {
    const rootKey = this.findRootKey(this.treeMap);
    this.rootNode.update(() => this.buildTree(rootKey, this.treeMap, 0));
  }

  private findRootKey(map: TreeMap): string {
    const keys = new Set(Object.keys(map));
    const children = new Set<string>();
    for (const k of Object.keys(map)) {
      for (const c of map[k]) children.add(c);
    }
    for (const k of keys) {
      if (!children.has(k)) return k;
    }
    throw new Error('No root key found');
  }

  private buildTree(name: string, map: TreeMap, depth: number): TreeNode {
    const childNames = map[name] ?? [];
    return {
      name,
      depth,
      children: childNames.map((child) => this.buildTree(child, map, depth + 1))
    };
  }
}

