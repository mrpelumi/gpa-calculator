import { createContext, useReducer, useEffect } from "react";

// returns a new course list with new course object
const addCourseItem = (courseList, numOfCourses) => {
  const courseItem = {id: numOfCourses + 1,name:'', grade:'A', credits:0}
  if (!courseList.length){
    return courseItem
  }
  return [...courseList, courseItem]
}

// filters course object
const removeCourseItem = (courseList, courseId) => {
  const existingItem = courseList.find(course => course.id === courseId);

  if (existingItem) {
    return courseList.filter(course => course.id !== courseId)
  }
}

// returns the gpa value
const gpaCalculation = (courseList) => {
  const gradeCourseList = courseList.map(course => {
    if (course.grade === 'A'){
      return {...course, grade:5}
    } else if (course.grade === 'B') {
      return {...course, grade:4}
    } else if (course.grade === 'C') {
      return {...course, grade:3}
    } else if (course.grade === 'D') {
      return {...course, grade:2}
    }
    return {...course, grade:0}
  })
  const gradeCreditTotal =  gradeCourseList.reduce((total, currentValue) => total + (currentValue.grade * Number(currentValue.credits)), 0)
  const creditTotal = gradeCourseList.reduce((total, currentValue) => total + Number(currentValue.credits), 0)
  return (gradeCreditTotal / creditTotal).toFixed(2);
}

// returns a new course list with updated course name
const updateCourseInputVal = (courseList, inputName, newVal, courseId) => {
  const existingItem = courseList.find(course => course.id === courseId);
  
  if (existingItem){
    if(inputName === 'course-name'){
      return courseList.map((course) => 
        (course.id === courseId) ? ({...course, name:newVal}) : ({...course})
    ) 
    } else if (inputName === 'course-credit') {
      return courseList.map((course) => 
      (course.id === courseId) ? ({...course, credits:newVal}) : ({...course})
    ) 
    } else if (inputName === 'course-grade') {
      return courseList.map((course) => 
      (course.id === courseId) ? ({...course, grade:newVal}) : ({...course})
    ) 
    }
    
  } 
}


// the context - holds default value 
export const GradeContext = createContext({
  courseList: [],
  gpaValue: 0,
  numOfCourses: 0,
  addCourseItemHandler: () => null,
  changeCourseInputHandler: () => null,
  removeCourseHandler: () => null,
  gpaCalculationHandler: () => null
})

// the reducer - updates the state
const GradeReducer = (state, action) => {
  const {type, payload} = action;

  switch(type) {
    case 'ADD_COURSE_ITEM':
      return {
        ...state,
        ...payload
      }
      case 'CHANGE_COURSE_INPUT_VALUE':
        return {
          ...state,
          ...payload
        }
      case 'REMOVE_COURSE_ITEM':
        return {
          ...state,
          ...payload
        }
      case 'SET_GPA_VALUE':
        return {
          ...state,
          ...payload
        }
    default:
      throw new Error(`this is an unhandled ${type}`)
  }
}

// initial state passed to the reducer
const INITIAL_STATE = {
  courseList: [],
  gpaValue: 0, 
  numOfCourses: 0, 
}

export const GradeProvider = ({children}) => {
  const [state, dispatch] = useReducer(GradeReducer, INITIAL_STATE);
  const {courseList, gpaValue, numOfCourses} = state;

  // Updates state to add new course object
  const courseListReducer = (newCourseList, numOfCourse) => {
    const newNumofCourses = numOfCourse + 1;
    const newPayload = {courseList:newCourseList, numOfCourses:newNumofCourses};
    dispatch({type:'ADD_COURSE_ITEM', payload:newPayload});
  }

  // Updates state to add new course name
  const courseValReducer = (newCourseList) => {
    const newPayload = {courseList:newCourseList};
    dispatch({type:'CHANGE_COURSE_INPUT_VALUE', payload: newPayload})
  }

  // removes course item object
  const removeCourseHandler = (event) => {
    const courseId = Number(event.currentTarget.id);
    const newCourseList = removeCourseItem(courseList, courseId);
    const newPayload = {courseList: newCourseList};
    dispatch({type:'REMOVE_COURSE_ITEM', payload:newPayload})
  }

  // Adds a single course object
  const addCourseItemHandler = () => {
    const newCourseList = addCourseItem(courseList, numOfCourses);
    courseListReducer(newCourseList, numOfCourses)
  }

  // Adds initial five course object
  const initialCourseListHandler = () => {
    const initialCourseList = Array.from({length: 5}, (_,index) => addCourseItem(courseList, index)
    )
    const numOfCourse = initialCourseList.length - 1;
    courseListReducer(initialCourseList, numOfCourse);
  }

  // Adds initial five course object on the launch of app
  useEffect(() => {
    initialCourseListHandler();
  },[])

  // Generic course input handler - updates state of input
  const changeCourseInputHandler = (event) => {
    const inputName = event.currentTarget.name;
    const newVal = event.target.value;
    const courseId = Number(event.currentTarget.id);
    const args = [inputName, newVal, courseId];
    const newCourseList = updateCourseInputVal(courseList, ...args);
    courseValReducer(newCourseList);
  }

  // updates the gpa value
  const gpaCalculationHandler = (event) => {
    event.preventDefault();
    const newGpa = gpaCalculation(courseList);
    const newPayload = {gpaValue: newGpa};
    dispatch({type:'SET_GPA_VALUE', payload:newPayload});
  }

  const value = {addCourseItemHandler, courseList, changeCourseInputHandler, removeCourseHandler, gpaCalculationHandler, gpaValue}

  return (<GradeContext.Provider value={value}>{children}</GradeContext.Provider>);
}