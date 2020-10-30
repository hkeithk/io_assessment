import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev',
      result: [],
      post: {
        businessType: '',
        businessType2: '',
        businessId: '',
      },
    };
  }

  render() {
    // console.log(this.state.post.businessId);
    const getAllBusiness = async () => {
      try {
        const result = await axios.get(
          'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/businesses'
        );
        console.log(result);
        this.setState({ result: result.data.result });
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

    //use existing endpoint and update business type

    const updateBusinessType = async () => {
      const value =
        'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/updatebusinessparam/' +
        this.state.post.businessType;
      // console.log(value);
      try {
        const result = await axios.post(value);
        console.log(result);
        let reply = [{ message: result.data.message }];
        this.setState({ result: reply });
      } catch (err) {
        return <p> An error has occured</p>;
      }
    };

    const updateTargetBusiness = async () => {
      const value =
        'https://kfc19k33sc.execute-api.us-west-1.amazonaws.com/dev/api/v2/updatebusinessparamjson';
      let params = {
        business_uid: this.state.post.businessId,
        business_type: this.state.post.businessType2,
      };

      // console.log(value);
      // console.log(params);
      try {
        const result = await axios.post(value, params);
        let reply = [{ message: result.data.message }];
        this.setState({ result: reply });
      } catch (err) {
        return <p>An error has occured </p>;
      }
    };

    return (
      <>
        <div className='main-container'>
          <div>
            <h4 style={{ padding: '10px' }}>
              What kind of information would you like?
            </h4>
            {/* <div className='fetch-data-container'> */}
            <div className='show-container'>
              <p>Show all businesses</p>
              <button className='button' onClick={getAllBusiness}>
                Submit
              </button>
            </div>

            <div className='show-container'>
              <p>Show business 200-000001</p>
              <button className='button' onClick={getOneBusiness}>
                Submit
              </button>
              {/* </div> */}
            </div>
          </div>

          <div>
            <h4 style={{ padding: '10px' }}>Update data below</h4>
            <div className='show-container'>
              <p>Update business Type for 200-000001</p>
              <input
                placeholder='Business Type'
                onChange={handleChange}
                name='businessType'
                className='text-input'
              />
              <button className='button' onClick={updateBusinessType}>
                Submit
              </button>
            </div>
            <div className='show-container'>
              <p>Update Business Type with UID</p>
              <input
                placeholder='Business ID'
                onChange={handleChange}
                name='businessId'
                className='text-input'
              />
              <input
                placeholder='Business Type'
                onChange={handleChange}
                name='businessType2'
                className='text-input'
              />
              <button className='button' onClick={updateTargetBusiness}>
                Submit
              </button>
            </div>
          </div>
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

export default App;
