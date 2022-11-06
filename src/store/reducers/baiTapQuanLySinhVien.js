const stateDefault = {
    mangSinhVien: [
        // {
        //     maSV: '222',
        //     hoTen: 'Lê Thị B',
        //     soDienThoai: '098765432',
        //     email: 'lethib@gmail.com',
            
        // },
        // {
        //     maSV: '333',
        //     hoTen: 'Hoàng Thị A',
        //     soDienThoai: '093365432',
        //     email: 'hoangthia@gmail.com',
            
        // }
    ],
    selectedUser : null,
}

export const baiTapQuanLySinhVien = (state = stateDefault, {type,payload}) => {
    switch(type){
        case 'ADD_USER': {
            const data = [...state.mangSinhVien]
            const user = {...payload, id: Date.now()}
            // console.log("payload: ", payload);
            // console.log("user: ", user);
            data.push(user)

            return {...state, mangSinhVien: data}

        }
        case 'DELETE_USER': {
           const data = state.mangSinhVien.filter(item => item.id !== payload)
           return {...state, mangSinhVien: data}
        }
        case 'EDIT_USER' : {
            const user = state.mangSinhVien.find(item => item.id === payload)
            return {...state,selectedUser: user}
        }

        case 'UPDATE_USER': {
            const newUserList = state.mangSinhVien.map((item)=>item.id === payload.id ? payload : item )
           

            state.selectedUser = null

            return {...state, mangSinhVien: newUserList}
        }
        // case 'SEARCH_USER': {
        //     const data = state.mangSinhVien.filter(item => item.maSV === payload)
         
           
        //     // console.log("value: ", value);
        //     return {...state, mangSinhVien: data}
        // }
        default: return state
    }
}