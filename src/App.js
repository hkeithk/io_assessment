import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      url: 'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev',
      result: [],
      post: {
        firstName: '',
        lastName: '',
      },
    };
  }

  render() {
    const getAllBusiness = async () => {
      try {
        const result = await axios.get(
          'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/businesses'
        );
        this.setState({ result: result.data.result });
        console.log(result);
      } catch (err) {
        return <p>An error has occured</p>;
      }
    };

    const getOneBusiness = async () => {
      try {
        const result = await axios.get(
          'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/onebusiness/200-000001'
        );
        this.setState({ result: result.data.result });
      } catch (err) {
        return <p>An error has occured</p>;
      }
    };

    const handleChange = (event) => {
      event.persist();
      this.setState((prev) => ({
        post: {
          ...prev.post,
          [event.target.name]: event.target.value,
        },
      }));
    };

    const updateName = async () => {
      const value =
        'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/updatefirstname/' +
        this.state.post.firstName;
      console.log(value);
      try {
        const res = await axios.post(value);
        console.log(res);
        // await axios.post(
        //   'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/updatefirstname/' +
        //     `${this.state.post.firstName}`
        // );
        // await axios.post(
        //   'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/updatefirstname/' +
        //     `${this.state.post.lastName}`
        // );
      } catch (err) {
        return <p> An error has occured</p>;
      }
    };

    return (
      <>
        <div className='show-container'>
          <p>Show all businesses</p>
          <button onClick={getAllBusiness}>Submit</button>
        </div>

        <div className='show-container'>
          <p>Show business 200-000001</p>
          <button onClick={getOneBusiness}>Submit</button>
        </div>

        <div className='show-container'>
          <p>Update First and last name</p>
          <input
            placeholder='First Name'
            onChange={handleChange}
            name='firstName'
          ></input>
          <input
            placeholder='Last Name'
            name='lastName'
            onChange={handleChange}
          ></input>
          <button onClick={updateName}>Submit</button>
        </div>

        <div>
          {this.state.result.map((item, index) => (
            <ul key={index}>
              {Object.keys(item).map((key, id) => (
                <li key={id}>
                  {key}: {item[key]}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </>
    );
  }
}

// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }

export default App;
