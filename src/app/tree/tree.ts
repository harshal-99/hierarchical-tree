import {Component, Input} from '@angular/core';
import {TreeNode} from './tree.type';

@Component({
  selector: 'app-tree',
  imports: [],
  templateUrl: './tree.html',
  styleUrl: './tree.css'
})
export class Tree {
  @Input({required: true}) node: TreeNode | null = null;
  @Input() isRoot = false;
}
