import React, { Component } from 'react'
import { connect } from 'react-redux';

class DanhSachSinhVien extends Component {
    state = {
        listData: this.props.mangSinhVien,
        textSearch: ""
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mangSinhVien !== this.props.mangSinhVien) {
            this.setState({
                ...this.state,
                listData: this.props.mangSinhVien,
            }
            )
        }
    }
    handleSearch = (event) => {
        const { value } = event.target
        if (!value) {
            this.setState({
                ...this.state,
                listData: this.props.mangSinhVien,
            }
            )
            return;
        }
        let filterData = this.props.mangSinhVien.filter((e) => {
            let sort = e.maSV.toLowerCase()
            return sort.indexOf(value) !== -1
        })
        if (filterData) {
            this.setState({
                ...this.state,
                listData: filterData,
            }
            )
        } else {
            this.setState({
                ...this.state,
                listData: this.props.mangSinhVien,
            }
            )
        }
    }
    render() {
        console.log("this.props.mangSinhVien,: ", this.props.mangSinhVien);
        // const { mangSinhVien } = this.props
        const { listData } = this.state
        return (
            <div className=''>

                <div className=' h-[0x] text-white p-2 mx-auto sm:p-4'>
                    <div className=" mb-5 flex md:flex-nowrap flex-wrap justify-end items-end md:justify-end">
                        <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">

                            <input placeholder='Nhập mã SV cần tìm' type="text" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={this.handleSearch}
                            />
                        </div>


                    </div>



                    <div className='overflow-x-auto'>




                        <table className="w-full p-4 text-xs text-left whitespace-nowrap">

                            <thead className=" bg-gray-400 p-4 text-white text-lg">

                                <tr>
                                    <th className="p-3">Mã SV</th>
                                    <th className="p-3">Họ tên</th>
                                    <th className="p-3">Số điện thoại</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">
                                        <span className="sr-only">Edit</span>

                                    </th>


                                </tr>
                            </thead>
                            <tbody className="border-b text-lg text-black">
                                {
                                    listData?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-3">{item.maSV}</td>
                                            <td className="p-3">{item.hoTen}</td>
                                            <td className="p-3">{item.soDienThoai}</td>
                                            <td className="p-3">{item.email}</td>
                                            <td>
                                                <button className='p-2 rounded-lg bg-pink-500 text-white mr-4'
                                                    onClick={() => {
                                                        this.props.dispatch({
                                                            type: 'DELETE_USER',
                                                            payload: item.id
                                                        })

                                                    }}>Xóa</button>
                                                <button className='p-2 rounded-lg bg-gray-500 text-white'
                                                    onClick={() => {
                                                        this.props.dispatch({
                                                            type: 'EDIT_USER',
                                                            payload: item.id
                                                        })
                                                    }}
                                                >Edit</button>






                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        mangSinhVien: state.baiTapQuanLySinhVien.mangSinhVien,
    }
}

export default connect(mapStateToProps)(DanhSachSinhVien)
