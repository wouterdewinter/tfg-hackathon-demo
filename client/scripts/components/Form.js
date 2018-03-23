import '../../styles/form.scss';

import React from 'react';
import { connect } from 'react-redux';

import { setAge, setGender, submit } from '../actions';

class Form extends React.Component {
  render() {
    return <div className='app app--form'>
      <div className='form-logo'/>

      <div className='content-panel'>
        <h2 className='text-center' style={{ marginBottom: 15 }}>
          Secure equal treatment
        </h2>

        <div className='text-center' style={{ marginBottom: 15 }}>
          <div className='label'>Enter your age</div>

          <input
            type='text'
            value={this.props.age}
            onChange={event => this.props.setAge(event.target.value)}/>
        </div>

        <div className='text-center' style={{ marginBottom: 20 }}>
          <div className='label'>Select your gender</div>

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

        <div className='row text-center'>
          <div className='col-12'>
            <button
              type='button'
              className='content-panel-button'
              onClick={() => this.props.submit(Number(this.props.age), this.props.gender)}>
              Secure now!
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
