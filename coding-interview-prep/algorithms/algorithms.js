// Symmetric difference

const symmetricDifference = (arr1, arr2) => {
  const diff = [...arr1, ...arr2].reduce(
    (total, item) =>
      (!arr1.includes(item) || !arr2.includes(item)) && !total.includes(item)
        ? total.concat(item)
        : total,
    []
  );

  return diff;
};

const sym = (...args) => {
  const symDiff = args.reduce(
    (total, item, i) => symmetricDifference(total, item),
    []
  );

  return symDiff.sort();
};

// Update inventory

const sortArrByName = (a, b) => {
  const first = a[1].toUpperCase();
  const second = b[1].toUpperCase();
  return first > second ? 1 : first < second ? -1 : 0;
};

const checkForDuplicates = (arrItem, arr) => {
  const result = arr.filter((item) => item[1] === arrItem[1]);
  return result.length > 0 ? result : false;
};

const update = (arr1, arr2) => {
  return arr1.reduce((total, arrItem) => {
    const update = checkForDuplicates(arrItem, arr2);
    return update[0]
      ? total.concat([[update[0][0] + arrItem[0], arrItem[1]]])
      : total.concat([arrItem]);
  }, []);
};

const addNewItems = (arr1, arr2) => {
  return arr2.reduce((total, arrItem) => {
    const duplicates = checkForDuplicates(arrItem, arr1);
    return duplicates ? total : total.concat([arrItem]);
  }, []);
};

const updateInventory = (arr1, arr2) => {
  const updated = update(arr1, arr2);
  const added = addNewItems(arr1, arr2);
  const sorted = [...updated, ...added].sort(sortArrByName);
  return sorted;
};

// Pairwise

function permAlone(str) {
  let permutationArray = [];

  // Heap's algorithm for permutations
  const allPermutations = (arr, n) => {
    if (n === 1) {
      permutationArray.push(arr.slice());
      return;
    }
    for (let i = 0; i < n; i++) {
      allPermutations(arr, n - 1);

      if (n % 2 === 1) {
        let temp = arr[0];
        arr[0] = arr[n - 1];
        arr[n - 1] = temp;
      } else {
        let temp = arr[i];
        arr[i] = arr[n - 1];
        arr[n - 1] = temp;
      }
    }
  };

  // return true if there are no repeated characters in array, otherwise returns false
  const checkRepeats = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] === array[i + 1]) {
        return false;
      }
    }
    return true;
  };

  allPermutations(str.split(""), str.length);
  const noRepeats = permutationArray.filter((arr) => checkRepeats(arr));

  return noRepeats.length;
}
