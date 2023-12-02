import './home.styles.scss';
import { useContext } from 'react';
import { GradeContext } from '../contexts/grade.context';
import Select from '../components/gradeForm/gradeForm.component';

const Home = () => {
  const {addCourseItemHandler, courseList, changeCourseInputHandler, removeCourseHandler} = useContext(GradeContext);

  const onChangeInputHandler = (event) => {
    changeCourseInputHandler(event);
  }

  const onClickRemoveHandler = (event) => {
    removeCourseHandler(event);
  }

  return (
    <div>
      <h1>GPA CALCULATOR</h1>
      <h3>Semester I</h3>
      <div className="semester-header">
        <span>Course Name</span>
        <span>Grade</span>
        <span>Credits</span>
      </div>

      <form>  
      {courseList.map(courseItem => {
        const {id, credits, name} = courseItem;
        return (
          <div className='semester-fields' key={courseItem.id}>
            <input id={id} name='course-name' type='text' onChange={onChangeInputHandler} value={name} placeholder='Adv. Calculus' required/>
            <Select id={id} />
            <input id={id} name='course-credit' value={credits} onChange={onChangeInputHandler} type='number' required/>
            <span id={id} onClick={onClickRemoveHandler}>&#10006;</span>
          </div>
        )
      })
       
      }
      <button type='submit'>Calculate GPA</button>
      </form>
      <button onClick={addCourseItemHandler}>Add Course</button>
    </div>
  )
}

export default Home;