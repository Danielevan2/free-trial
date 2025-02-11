import axios from 'axios'

const state = {
    listItem : [],
    totalHarga : 0,
    pembayaran: false,
    dataTransaksi:{},
    print: false
}
const mutations = {
    fillItem(state,payload){
      if(payload === false){
        state.listItem = []
      }else{
        if(state.listItem.length > 0){
          let flag = false
          for(let i = 0 ; i < state.listItem.length ; i++){
            if(state.listItem[i].id === payload.id){
              state.listItem[i].qty = Number(payload.qty) + Number(state.listItem[i].qty)
              flag = true
              break
            }
          }
          if(!flag){
          state.listItem.push(payload)
          }
        }else{
          state.listItem.push(payload)
        }
      }

    },
    fillTotal(state,payload){
        state.totalHarga = payload
        },
    fillPembayaran(state,payload){
        state.pembayaran = payload
        },        
    fillTransaksi(state,payload){
      state.dataTransaksi = payload
    } ,
    fillPrint(state,payload){
      state.print = payload
      },       
}
const actions = {
  addItem(context,payload,limit) {
      context.commit('fillItem',payload)
  },
  async createTransaksi(context,payload,limit){
    let tempItem = []
    await payload.listItem.forEach(element => {
      let temp = {
        idBarang: element._id,
        kodeBarang: element.kodeBarang,
        nama: element.nama,
        qty: Number(element.qty),
        hargaModal: element.harga
      }

      tempItem.push(temp)
    });
    // payload.listItem = tempItem
    // context.commit('fillTransaksi',payload)
    // context.commit('fillPrint',true)
    console.log(tempItem)
    console.log(payload.kasir.userId)
    axios({
      url: `https://free-trial-b6eefb5f026f.herokuapp.com/transaksi/pembelian`,
      method: 'post',
      headers:{
          token : localStorage.getItem('token')
      },
      data:{
          admin: payload.kasir.userId,
          listItem: tempItem,
          totalHarga: payload.total,          
          metode: payload.pembayaran                   
      }
      })
        .then(({data}) =>{
          payload.id = data._id
          payload.listItem = tempItem
          context.commit('fillTransaksi',payload)
          context.commit('fillPrint',true)
        })
        .catch(err=>{
                console.log(err)                    
        })     
  },
  printBill(context,payload,limit){
    state.listItem = payload.listItem
    context.commit('fillTransaksi',payload)
    context.commit('fillPrint',true)
  }
}
const getters = {
    getListItem : (state) => {
      return  state.listItem
    },
    getTotalHarga : (state) => {
        return  state.totalHarga
      },
    getPembayaran : (state) => {
        return  state.pembayaran
      },      
    getTransaksi :(state) =>{
      return state.dataTransaksi
    },
    getPrint : (state) => {
      return  state.print
    },     
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}