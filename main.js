class Node {
  constructor(value, key) {
    this.value = value;
    this.key = key;
    this.link = null;
  }
}

class linkedList {
  constructor() {
    this.head = null;
  }

  append(value, key) {
    if (this.head == null) {
      this.head = new Node(value, key);
    } else {
      let current = this.head;
      while (current.link) {
        if (current.key == key && current.value == value) {
          return;
        }
        current = current.link;
      }
      if (current.key == key && current.value == value) {
        return;
      }
      if (current.key == key) {
        current.value = value;
      } else {
        current.link = new Node(value, key);
      }
    }
  }

  get(key) {
    let current = this.head;
    while (current) {
      if (current.key == key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  contain(key) {
    let current = this.head;
    if (current.key == key) {
      return true;
    }
    while (current.next) {
      current = current.next;
      if (current.key == key) {
        return true;
      }
    }
    if (current.key == key) {
      return true;
    }
    return false;
  }

  remove(key) {
    let current = this.head;
    let i = 0;
    if (current.key == key) {
      this.removeAt(i);
      return true;
    }
    while (current.next) {
      current = current.next;
      i++;
      if (current.key == key) {
        this.removeAt(i);
        return true;
      }
    }
    if (current.key == key) {
      this.removeAt(i);
      return true;
    }
    return false;
  }

  size() {
    let total = 0;
    let current = this.head;
    while (current) {
      total++;
      current = current.link;
    }
    return total;
  }

  removeAt(index) {
    if (index == 0) {
      this.head = this.head.next;
    }
    let current = this.head;
    let now = 0;
    if (index >= this.size()) {
      return;
    }
    while (now < index) {
      current = current.link;
      now++;
    }
    let fix = index - 1;
    let now2 = 0;
    let current2 = this.head;
    while (now2 < fix) {
      current2 = current2.link;
      now2++;
    }
    current2.link = current.link;
  }
}

class hashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.buckets = Array.from({ length: 16 }, () => new linkedList());
  }

  redo() {
    let entries = this.entries();
    console.log(entries)
    this.buckets = Array.from(
      { length: this.buckets.length * 2 },
      () => new linkedList()
    );
    console.log(this.buckets)
    entries.forEach((setter) => {
      let temp = setter.trim().split(",").map(item => item.trim())
      console.log(temp)
      this.set(temp[0], temp[1]);
    });
  }

  hash(key) {
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = 31 * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.buckets.length;
  }

  set(key, value) {
    let hashNum = this.hash(key);
    let arr = this.buckets[hashNum];
    arr.append(value, key);
    if (this.length() > this.buckets.length * this.loadFactor) {
      this.redo();
    }
  }

  get(key) {
    let hashNum = this.hash(key);
    let arr = this.buckets[hashNum];
    return arr.get(key);
  }

  has(key) {
    let hashNum = this.hash(key);
    let arr = this.buckets[hashNum];
    if (arr.head) {
      return arr.contain(key);
    }
    return false;
  }

  remove(key) {
    let hashNum = this.hash(key);
    let arr = this.buckets[hashNum];
    arr.remove(key);
  }

  length() {
    let total = 0;
    this.buckets.forEach((arr) => (total = total + arr.size()));
    return total;
  }

  clear() {
    this.buckets = Array.from({ length: 16 }, () => new linkedList());
  }

  keys() {
    let returned = [];
    this.buckets.forEach((arr) => {
      let current = arr.head;
      while (current) {
        returned.push(current.key);
        current = current.next;
      }
    });
    return returned;
  }

  values() {
    let returned = [];
    this.buckets.forEach((arr) => {
      let current = arr.head;
      while (current) {
        returned.push(current.value);
        current = current.next;
      }
    });
    return returned;
  }

  entries() {
    let returned = [];
    this.buckets.forEach((arr) => {
      let current = arr.head;
      while (current) {
        returned.push(current.key + ", " + current.value);
        current = current.link;
      }
    });
    return returned;
  }
}

const test = new hashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set('moon', 'silver');
console.log(test)