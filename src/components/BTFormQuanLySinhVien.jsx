import React, { Component } from 'react'
import DanhSachSinhVien from './DanhSachSinhVien'
import FormThongTin from './FormThongTin'

export default class BTFormQuanLySinhVien extends Component {
  render() {
    return (
      <div className=' '>
        <div className='max-w-7xl m-auto '>
        <h1 className='text-pink-500 text-[30px] text-center'>---- Bài tập quản lý sinh viên ----</h1>
        <hr />
        <FormThongTin></FormThongTin>
        <DanhSachSinhVien></DanhSachSinhVien>
      </div></div>
      
    )
  }
}