Date: 29 Oct 2023
Title: Binary Search
Desc:
Basic idea is to half the search space in every iteration thereby making the search in O(logn) complexity.

# Condition:
The array must be increasing or decreasing order (sorted).

Code:
```
def binarySearch(arr,size,key):
    start,end = 0,size-1
    mid = (start+end)//2

    while start <= end:
        if arr[mid] == key:
            return mid
        if key > arr[mid]:
            start = mid + 1
        else:
            end = mid - 1
        mid = (start+end)//2
    return -1
```

- Optimising condition
if you are using a language that has max limit for a particular data type, the calculation of mid ie start+end can lead to an out of bounds error
To avoid that:
```
int mid = start + (end-start)/2;
```


- Applications:
1. Lower bound, upper bound- Number of occurences
2. Pivot elements
3. Rotated Arrays
4. Search space reduction
5. Book allocation
etc
