# Date: 31 Oct 2023
#  Title: Binary Search Problems

# Q1 Find Pivot element
def getPivot(arr):
    '''We assume pivot element is the lowest element. ie: start of second line'''
    start,end = 0, len(arr)-1
    mid = (start+end)//2

    while start < end:
        # if mid lies in the top line
        if arr[0] < arr[mid]:
            start = mid + 1
        else:
            end = mid
        mid = (start+end)//2
    return start # or end, same thing


arr = [7,8,9,1,3,5]
# print('Pivot is: ',getPivot(arr))

# Q2 Find element in sorted rotated arraay
def binarySearch(arr,s,e,key):
    start,end = s,e
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

pivot = getPivot(arr)
k = 5
if arr[pivot] <= k and k <= arr[len(arr)-1]:
    print(binarySearch(arr,pivot,len(arr)-1,k))
else:
    print(binarySearch(arr,0,pivot-1,k))

# Q3 Square root of number using binary search
def findsqrt(num):
    start,end = 0,num
    mid = (start+end)//2
    ans = -1

    while start <= end:
        square = mid * mid
        if square == num:
            return mid
        if square < num:
            ans = mid
            start = mid + 1
        else:
            end = mid - 1
        mid = (start+end)//2
    return ans

def morePrecision(num,precision,intSol):
    factor,ans = 1.0,intSol

    for _ in range(precision):
        factor *= 0.1
        j = ans
        while j*j < num:
            ans = j
            j += factor
    return ans

num = 567
print('Squareroot of {} is: '.format(num),morePrecision(num,3,findsqrt(num)))