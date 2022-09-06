import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './scss/UserManage.scss'
import { userService } from "../../services";
import { emitter } from "../../utils/emitter";
import ModalUser from './ModalUser';
import ModelEditUser from './ModelEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditUser: false,
            editData: {}
        }
    }

    /** Life cycle
     * Run component:
     * 1. Run constructor -> init state
     * 2. Did mount (set state )  //call api, get data from BE
     * 3. Render
     */
    async componentDidMount() {
        await this.getAllUsersFromNodeJS()
    }
    OpenAddNewUserModal = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    getAllUsersFromNodeJS = async () => {
        let response = await userService.getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleCreateNewUser = async (data) => {
        try {
            let response = await userService.createNewUser(data)
            if (response && response.errCode !== 0) {
                alert(response.message)
            }
            else {
                await this.getAllUsersFromNodeJS()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }

    toggleEditUser = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser
        })
    }

    OpenEditUserModal = (item) => {
        this.setState({
            isOpenEditUser: true,
            editData: item
        })
    }

    handleEditUser = async (data) => {
        let response = await userService.editUSer(data)
        if (response && response.errCode === 0) {
            await this.getAllUsersFromNodeJS()
            this.setState({
                isOpenEditUser: false
            })
        }
        else alert(response.message)
    }

    handleDeleteUser = async (id) => {
        let response = await userService.deleteUser(id)
        if (response && response.errCode === 0) {
            await this.getAllUsersFromNodeJS()
        }
        else alert(response.message)

    }

    //mỗi khi gọi hàm this.setState, hàm render sẽ được chạy lại
    render() {

        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">

                {/*isOpen là props của ModalUser, nó thừa kế các thuộc tính của state 
                từ thằng cha là UserManage 
                    createNewUser là function của thằng cha, thằng con sẽ thừa kế từ nó
                    bằng cách gọi hàm createNewUserFromParent từ props của nó 
                */}
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUserFromParent={this.handleCreateNewUser}
                />
                {this.state.isOpenEditUser && <ModelEditUser
                    isOpen={this.state.isOpenEditUser}
                    toggleFromParent={this.toggleEditUser}
                    editUserFromParent={this.handleEditUser}
                    currentUser={this.state.editData}
                />}
                <div className='title text-center'>Manage users</div>

                {/* mt-4: margin top=4 , mx: margin by Ox: 5,5(left,right)  */}
                <div className='users-table mt-4 mx-5'>
                    <div className='mx-1 my-3'>
                        <button className='btn btn-primary px-3' onClick={() => this.OpenAddNewUserModal()}>
                            <i className='fas fa-plus'></i> Add new user
                        </button>
                    </div>
                    <table>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>

                        {
                            arrUsers && arrUsers.map((item, index) => {
                                //dung fragment <></> ở đây vì cần phải bao bọc đến 3 div (3 components)
                                return (
                                    <tr>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.roleId == 1 ? 'Doctor' : 'Patient'}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.OpenEditUserModal(item)}>
                                                <i class="fas fa-pencil-alt "></i></button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item.id)}><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
