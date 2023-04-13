//There are some columns of toy cubes in the box arranged in a line. The i-th column contains a_i cubes. At first, the gravity in the box is pulling
//the //cubes downwards. When Bob switches the gravity, it begins to pull all the cubes to a certain side of the box, d, which can be either 'L' or 'R' 
//(left or right). Below is an example of what a box of cubes might look like before and after switching gravity. 

const flip=(d, a)=>{ 
    if (d === 'R') {
        return a.sort((a, b) => a - b); //sorts the array in ascending order
    } else {
        return a.sort((a, b) => b - a); //sorts the array in descending order
    }
    }

return flip