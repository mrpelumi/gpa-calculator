import './home.styles.scss';
import { useContext } from 'react';
import { GradeContext } from '../contexts/grade.context';
import Select from '../components/gradeForm/gradeForm.component';
import {Form } from 'react-bootstrap';
import {ReactComponent as CancelIcon} from '../assets/cancel-icon.svg';
import {ReactComponent as CalculatorIcon} from '../assets/calculator-icon.svg';
import {ReactComponent as AddIcon} from '../assets/add-icon.svg';


const Home = () => {
  const {addCourseItemHandler, courseList, changeCourseInputHandler, removeCourseHandler, gpaCalculationHandler, gpaValue} = useContext(GradeContext);

  const onChangeInputHandler = (event) => {
    changeCourseInputHandler(event);
  }

  const onClickRemoveHandler = (event) => {
    removeCourseHandler(event);
  }

  return (
    <div className='calculator-container p-5'>
      <h1 className='calc-header p-2 mb-3 text-start'>GPA CALCULATOR</h1>
      <div className='semester-container p-4 rounded-3'>
      <p className= 'semester-txt p-2 mb-3 fs-2 fw-semibold'>Semester I</p>
      <div className="semester-header mb-2 p-1">
        <span className='p-2 fw-bold'>Course Name/Code</span>
        <span className='p-2 fw-bold grade'>Grade</span>
        <span className='p-2 fw-bold credits'>Credits</span>
      </div>

      <div className='mb-3 p-1'>
      <Form onSubmit={gpaCalculationHandler}>  
        {courseList.map(courseItem => {
          const {id, credits, name} = courseItem;
          return (
            <div className='semester-fields p-2' key={courseItem.id}>
              <input className='course-input border-0 rounded-2 p-2' id={id} name='course-name' type='text' onChange={onChangeInputHandler} value={name} placeholder='E.g Maths' required/>
              <Select id={id} className='grade-input border-0 rounded-2 p-2' />
              <input className='credit-input border-0 rounded-2 p-2' id={id} name='course-credit' value={credits} onChange={onChangeInputHandler} type='number' min={0} max={30} required/>
              <CancelIcon className='my-auto' id={id} onClick={onClickRemoveHandler} />
            </div>
          )
        })
        }
        <div className='button-container mt-3 mb-1 p-1'>
        <button className='btn-gpa btn btn-outline-secondary me-4 p-3 rounded-3' type='submit'><CalculatorIcon />  Calculate GPA</button>
        <button type='button' className='btn-course btn btn-outline-secondary p-3 rounded-3' onClick={addCourseItemHandler}><AddIcon /> Add Course</button>
      </div>
      </Form>
      </div>
      
      <div className='result-container text-center'>
        {
          (isNaN(gpaValue)) ? (<h1 className='fs-2'>GPA: 0</h1>) : (<h1 className='fs-2'>GPA: {gpaValue}/5.0</h1>)
        }
        
      </div>
      </div>
    </div>
  )
}

export default Home;