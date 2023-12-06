import { useContext } from "react"
import { GradeContext } from "../../contexts/grade.context"

const Select = ({id, className}) => {
  const {changeCourseInputHandler} = useContext(GradeContext);

  const optionList = [
    {value:'A', label:'A'},
    {value:'B', label:'B'},
    {value:'C', label:'C'},
    {value:'D', label:'D'},
    {value:'F', label:'F'},
  ]

  const onChangeHandler = (event) => {
    return changeCourseInputHandler(event);
  }

  return (
  <select name="course-grade" id={id} className={className} onChange={onChangeHandler} required>
    {optionList.map(item => {
      const {label, value} = item;
      return <option value={value} key={item.value}>{label}</option>
    })}
  </select>)
}

export default Select;