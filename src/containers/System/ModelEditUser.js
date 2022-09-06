import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';  //check object có rỗng hay k

class ModalUser extends Component {


  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password:'',
      email:'',
      id:''
    }
  }

  componentDidMount() {
    let { currentUser } = this.props;
    if (currentUser && !_.isEmpty(currentUser))
      this.setState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phoneNumber: currentUser.phoneNumber,
        password: 'hardcode',
        email: currentUser.email,
        id: currentUser.id
      })
  }

  toggle = () => {
    this.props.toggleFromParent()
  }
  handleOnchange = (event, id) => {
    let copyState = { ...this.state }
    copyState[id] = event.target.value

    this.setState({
      ...copyState
    })
  }
  handleApply = () => {
    this.props.editUserFromParent(this.state)  //day la function cua thang cha
  }


  render() {
    // console.log('data from parent', this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className='modal-user-container'
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
          <div class="input-container">
              <label htmlFor="email">Email</label>
              <input type="email" class="form-control"
                onChange={event => this.handleOnchange(event, "email")}
                id="email" name="email" placeholder="Email"
                value={this.state.email}
                disabled
              />
            </div>
            <div class="input-container">
              <label htmlFor="password">Password</label>
              <input type="password" class="form-control"
                onChange={event => this.handleOnchange(event, "password")}
                id="password" name="password" placeholder="Password"
                value={this.state.password}
                disabled
              />
            </div>
            <div class="input-container">
              <label htmlFor="firstName">First name</label>
              <input type="text" class="form-control"
                onChange={event => this.handleOnchange(event, "firstName")}
                id="firstName" name="firstName" placeholder="First name"
                value={this.state.firstName}
              />
            </div>
            <div class="input-container">
              <label htmlFor="lastName">Last name</label>
              <input type="text" class="form-control"
                onChange={event => this.handleOnchange(event, "lastName")}
                id="lastName" name="lastName" placeholder="Last name"
                value={this.state.lastName}
              />
            </div>
            <div class="input-container">
              <label htmlFor="phoneNumber">Phone number</label>
              <input type="text" class="form-control"
                onChange={event => this.handleOnchange(event, "phoneNumber")}
                id="phoneNumber" name="phoneNumber" placeholder="Phone number"
                value={this.state.phoneNumber}
              />
            </div>
            {/* <div class="input-container">
              <label htmlFor="gender">Gender</label>
              <select id="gender" class="form-control"
                onChange={event => this.handleOnchange(event, "gender")} name="gender"
                value={this.state.gender}
              >
                <option value="1"> Male</option>
                <option value="2"> Female</option>
              </select>
            </div>
            

            <div class="input-container">
              <label htmlFor="roleId">Role</label>
              <select id="roleId" class="form-control"
                onChange={event => this.handleOnchange(event, "roleId")} name="roleId"
                value={this.state.roleId}
              >
                <option value="1"> Doctor</option>
                <option value="2"> Patient</option>
              </select>
            </div>
            <div class="input-container max-width-input">
              <label htmlFor="address">Address</label>
              <input type="text" class="form-control "
                onChange={event => this.handleOnchange(event, "address")}
                id="address" name="address" placeholder="Address"
                value={this.state.address}
              />
            </div>
            <div class="input-container max-width-input">
              <label htmlFor="image">Image</label>
              <input type="text" id="image" class="form-control"
                onChange={event => this.handleOnchange(event, "image")}
                name="image" defaultValue="dai.jpg"
                value={this.state.image}
              />
            </div> */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='px-3' onClick={this.handleApply}>Apply</Button>{' '}
          <Button color="secondary" className='px-3' onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



