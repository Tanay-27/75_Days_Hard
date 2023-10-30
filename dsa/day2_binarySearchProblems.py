#Date: 30 Oct 2023
#Title: Binary Search Problems

# Q1: First and last position of an element in a sorted array.
def firstOcc(arr,key):
    start,end,ans = 0,len(arr)-1,-1
    mid = (start+end)//2

    while start <= end:
        if arr[mid] == key:
            ans = mid
            end = mid - 1
    
        elif key > arr[mid]:
            start = mid + 1
        else:
            end = mid - 1
        mid = (start+end)//2

    return ans

def lastOcc(arr,key):
    start,end,ans = 0,len(arr)-1,-1
    mid = (start+end)//2

    while start <= end:
        if arr[mid] == key:
            ans = mid
            start = mid + 1
    
        elif key > arr[mid]:
            start = mid + 1
        else:
            end = mid - 1
        mid = (start+end)//2

    return ans


# Driver code
arr = [1,2,3,3,3,3,3,5]
print('First occ of 3 is:',firstOcc(arr,3))
print('Last occ of 3 is:',lastOcc(arr,3))


# Q2: Find Peak index in a mountain array
def findPeakIdx(arr):
    start,end = 0,len(arr)-1
    mid = (start+end)//2

    while start < end: # <= is not used since it is already compared as start = mid + 1 but end = mid only
        if arr[mid] < arr[mid+1]:
            start = mid + 1
        else:
            end = mid # this is since, in case end is the peak element
        mid = (start+end)//2
    return start

# Driver code
arr =  [1,3,5,7,6,4,2]
print('peak index is:',findPeakIdx(arr))

# Q3: Find Pivot in an array