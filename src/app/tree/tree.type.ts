export type TreeMap = {
  [key: string]: string[];
}

export type TreeNode = {
  name: string;
  children: TreeNode[];
  depth: number;
}
