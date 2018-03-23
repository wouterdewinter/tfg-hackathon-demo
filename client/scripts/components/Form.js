import React from 'react';
import { connect } from 'react-redux';

import { setAge, setGender, submit } from '../actions';

class Form extends React.Component {
  render() {
    return <div className='app app--form'>
      <h1 className='content-title text-right'>Your data</h1>

      <div className='content-panel'>
        <div className='row'>
          <div className='col-6'>
            Your age
          </div>

          <div className='col-6'>
            <input
              type='number'
              value={this.props.age}
              onChange={event => this.props.setAge(event.target.value)}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            Your gender
          </div>

          <div className='col-6'>
            <div>
              <label>
                <input
                  type='radio'
                  value='female'
                  checked={this.props.gender === 'female'}
                  onChange={this.props.setGender.bind(null, 'female')}/> Female
              </label>
            </div>

            <div>
              <label>
                <input
                  type='radio'
                  value='male'
                  checked={this.props.gender === 'male'}
                  onChange={this.props.setGender.bind(null, 'male')}/> Male
              </label>
            </div>
          </div>
        </div>

        <div className='row text-right'>
          <div className='col-12'>
            <button
              type='button'
              className='content-panel-button'
              onClick={() => this.props.submit(Number(this.props.age), this.props.gender)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = ({ form }) => ({ ...form });
const mapDispatchToProps = dispatch => ({
  setAge: age => dispatch(setAge(age)),
  setGender: gender => dispatch(setGender(gender)),
  submit: (age, gender) => dispatch(submit(age, gender))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
