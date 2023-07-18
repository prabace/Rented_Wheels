import React , {useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Datepicker = () => {
    const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);

  const handleChange = (date, type) => {
    if (type === 'from') {
      setFromDate(date);
    } else if (type === 'till') {
      setTillDate(date);
    }
  };

  const date_to_day = (begin, end) => {
    if (!begin || !end) {
      return -1;
    }
    const date1 = new Date(begin);
    const date2 = new Date(end);
  
    // Calculate today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the selected date is before today
    if (date1 < today || date2 < today) {
      return -1; // Return -1 to indicate an invalid date
    }

    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days;
  };
  return (
    <div>
      <DatePicker
        selected={fromDate}
        onChange={(date) => handleChange(date, 'from')}
        minDate={new Date()}
        placeholderText="Select From Date"
      />
      <DatePicker
        selected={tillDate}
        onChange={(date) => handleChange(date, 'till')}
        minDate={new Date()}
        placeholderText="Select Till Date"
      />
      <p>No. of Days: {date_to_day(fromDate, tillDate)}</p>
    </div>
  )
}

export default Datepicker