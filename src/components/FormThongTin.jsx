import React, { Component } from 'react'
import { connect } from 'react-redux'

class FormThongTin extends Component {
    stateDefault = {
        maSV: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
    }
    state = {
        values: this.stateDefault,

        error: {},


    }

    handleState = (event) => {
        const { name, value } = event.target
        this.setState({
            values: {
                ...this.state.values,
                [name]: value,
            }


        })

    }
    handleBlur = (event) => {
        const {
            name,
            title,
            minLength, maxLength,
            validationMessage,
            validity: { valueMissing, tooShort, patternMismatch },
        } = event.target
        // console.log("valueMissing: ", valueMissing);
        // // console.log("validationMessage: ", validationMessage);
        // // const { valueMissing, tooShort } = validity
        // console.log("validationMessage: ", validationMessage);

        let mess = ''

        if (valueMissing) {
            mess = `${title} không được bỏ trống nhé !`
        }
        if (tooShort) {
            mess = `${title} phải từ ${minLength} đến ${maxLength} ký tự nhé !`
        }
        if (patternMismatch) {
            mess = `${title} không đúng định dạng!`
        }


        this.setState({
            error: {
                ...this.state.error,
                [name]: mess,

            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (!event.target.checkValidity()) {
            return
        }
        // console.log(this.state);
        this.props.dispatch({
            type: this.props.selectedUser ? 'UPDATE_USER' : 'ADD_USER',
            payload: this.state.values,

        })

        // this.props.dispatch({
        //     type: 'EDIT_USER',
        //     payload: this.state.values,

        // })

        this.setState({
            values: this.stateDefault
        })

    }


    static getDerivedStateFromProps = (nextProps, currentState) => {
        if (nextProps.selectedUser && nextProps.selectedUser.id !== currentState.values.id) {
            currentState.values = nextProps.selectedUser
        }
        return currentState

    }


    render() {
        // console.log("state: ", this.state);
        // const { selectedUser } = this.props
        const { maSV, hoTen, email, soDienThoai } = this.state.values
        // console.log("selectedUser: ", selectedUser);
        return (
            <form noValidate
                onSubmit={this.handleSubmit}
            // onSubmit={(event) => {
            //     event.preventDefault()
            // }}
            >
                <div>
                    <p className='p-5 bg-gray-400 text-white text-2xl'>Thông tin sinh viên</p>
                    <div className='grid grid-cols-2 mt-10 gap-5'>
                        <div>
                            <p>Mã sinh viên</p>
                            <input value={maSV} title='Mã sinh viên' minLength={4} maxLength={6} name='maSV' required className="border-2 border-black rounded-sm p-3 w-full mt-4" type="text" placeholder='Nhập mã SV vào đây nhé!'
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            // onChange={(event) => {

                            //     this.setState({
                            //         id: event.target.value

                            //     })

                            // }}
                            />
                            <span className='text-red-500 text-[14px]'>{this.state.error.maSV}</span>
                        </div>
                        <div>
                            <p>Họ tên</p>
                            <input value={hoTen} title='Họ và tên' name='hoTen' required className="border-2 border-black rounded-sm p-3 w-full mt-4" type="text" placeholder='Nhập họ tên vào đây nhé!'
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            // onChange={(event) => {
                            //     this.setState({
                            //         hoTen: event.target.value,
                            //     })
                            // }}

                            />
                            <span className='text-red-500 text-[14px]'>{this.state.error.hoTen}</span>
                        </div>
                        <div>
                            <p>Số điện thoại</p>
                            <input value={soDienThoai} title='Số điện thoại' name='soDienThoai' required className="border-2 border-black rounded-sm p-3 w-full mt-4" type="text" placeholder='Nhập số điện thoại vào đây nhé!'
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            // onChange={(event) => {
                            //     this.setState({
                            //         soDienThoai: event.target.value,
                            //     })
                            // }}
                            />
                            <span className='text-red-500 text-[14px]'>{this.state.error.soDienThoai}</span>
                        </div>
                        <div>
                            <p>Email</p>
                            <input value={email} pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$' title='Email' name='email' required className="border-2 border-black rounded-sm p-3 w-full mt-4" type="text" placeholder='Nhập email vào đây nhé!'
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            // onChange={(event) => {
                            //     this.setState({
                            //         email: event.target.value,
                            //     })
                            // }}
                            />
                            <span className='text-red-500 text-[14px]'>{this.state.error.email}</span>
                        </div>

                    </div>
                    <button type='submit' className={`mt-8 p-4 bg-pink-500 font-semibold rounded-full text-white cursor-pointer hover:bg-gray-700 mr-4 ${!this.props.selectedUser ? '' : 'hidden'}`}>Thêm sinh viên</button>
                    <button type='submit' className={`mt-8 p-4 bg-pink-500 font-semibold rounded-full text-white cursor-pointer hover:bg-gray-700 mr-4 ${this.props.selectedUser ? '' : 'hidden'}`}
                        onClick={this.handleSubmit}
                    >Cập nhật</button>
                    {/* <button type='reset' className=' mt-8 p-4 bg-pink-500 font-semibold rounded-full text-white cursor-pointer hover:bg-gray-700 mr-4'>Reset</button> */}






                   

                </div></form>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.baiTapQuanLySinhVien,
    }
}

export default connect(mapStateToProps)(FormThongTin)
