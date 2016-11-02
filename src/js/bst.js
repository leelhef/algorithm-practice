class BSTNode {
	constructor (key, value) {
		this.left = null;
		this.right = null;
		this.key = key;
		this.value = value;
	}
}
function Node (key, value) {
	return new BSTNode(key, value);
}
class BinarySearchTree {
	constructor () {
		this.root = null;
		this.length = 0;	
		this.order = "";	
	}
	get (key) {
		return getValue(this.root, key);
	}
	// 插入节点
	insert (key, value) {
		if (key == null || value == null)
			throw new Error("参数传入有误");
		this.root = InsertNode(this.root, key, value);
		this.length++;
	}
	// 获取最大值
	max () {
		if (this.root === null) return void 0;
		return getMax(this.root);
	}
	// 获取最小值
	min () {
		if (this.root === null) return void 0;
		return getMin(this.root).value;
	}
	// 找到小于等于key中的最大值
	getFloor (key) {
		if (key == null)
			throw new Error("参数传入有误");
		const current = GetFloor(this.root, key);
		return current && current.key;
	}
	// 找到大于等于key中的最小值
	getCelling (key) {
		if (key == null)
			throw new Error("参数传入有误");
		const current = GetCelling(this.root, key);
		return current && current.key;
	}
	// 删除最小节点
	delMin () {
		if (this.root === null) 
			return void 0;
		this.root = DeleteMin(this.root);
		this.length--;
	}
	// 删除最大的节点
	delMax () {
		if (this.root === null)
			return void 0;
		this.root = DeleteMax(this.root);
		this.length--;
	}
	// 获取排序(中序遍历)
	orderTraversal () {
		this.order = "";
		this.MinOrder(this.root);
		return this.order.substr(0, this.order.length - 1);
	}
	MinOrder (current) {
		if (current === null) return void 0;
		this.MinOrder(current.left);
		this.order += `${current.key},`;
		this.MinOrder(current.right);
	}
	delete (key) {
		if (key == null || this.get(key) === undefined) 
			return void 0;
		this.root = Delete(this.root, key);
	}
}
function Delete (current, key) {
	if (current.key < key) {
		current.right = Delete(current.right, key);
	} else if (current.key > key) {
	 	current.left = Delete(current.left, key);
	} else {
		if (current.left === null) 
			return current.right;
		if (current.right === null)
			return current.left;
		const temp = current;
		current = getMin(current.right);
		current.right = DeleteMin(temp.right);
		current.left = temp.left;
	}
	return current;
}
function getValue (current, key) {
	if (current === null) return void 0;
	if (current.key === key) {
		return current.value;
	} else if (current.key < key) {
		return getValue(current.right, key);
	} else {
		return getValue(current.left, key);
	}
}
function InsertNode (current, key, value) {
	if (current === null) return Node(key, value);
	if (current.key === key) {
		current.value = value;
	} else if (current.key < key) {
		current.right = InsertNode(current.right, key, value);
	} else {
		current.left = InsertNode(current.left, key, value);
	}
	return current;
}
function getMax (current) {
	if (current.right === null) return current.value;
	return getMax(current.right);
}
function getMin (current) {
	if (current.left === null) return current;
	return getMin(current.left);
}
function DeleteMax (current) {
	if (current.right === null) return current.left;
	current.right = DeleteMax(current.right);
	return current;
}
function DeleteMin (current) {
	if (current.left === null) return current.right;
	current.left = DeleteMin(current.left);
	return current;
}
function GetCelling (current, key) {
	if (current === null) return void 0;
	if (current.key === key) {
		return current;
	} else if (current.key < key) {
		return GetCelling(current.right, key);
	} else {
		return GetCelling(current.left, key) || current;
	}
}
function GetFloor (current, key) {
	if (current === null) return void 0;
	if (current.key === key) {
		return current;
	} else if (current.key > key) {
		return GetFloor(current.left, key);
	} else {
		return GetFloor(current.right, key) || current;
	}
}
export default BinarySearchTree;