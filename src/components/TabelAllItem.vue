<template>
  <div class="overflow-auto"> 
        <v-card max-width="auto" tile flat class="my-5">
          <v-toolbar color="" flat height="60px" >
            <v-spacer></v-spacer>
                <h2>Item</h2>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>   

        <v-row class="m-4">
          <!-- search name -->
            <v-col
                cols="12"
                sm="12"
            >     
              <v-text-field
                  solo
                  label="Pencarian Nama / Kode"
                  append-icon="mdi-magnify"
                  v-on:keyup.enter="search(1)"
                  class="mr-4 ml-4"
                  clearable
                  v-model="src"        
              ></v-text-field>
              </v-col>        
          <!-- search name -->              
        </v-row>      
        
        <!-- tabel item -->
         <v-simple-table
              fixed-header
              height="400px"
              v-if="loading === false"
          >            
              <template v-slot:default >
              <thead>
                  <tr>
                      <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                      <h5>Kode</h5>
                  </th>                        
                  <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                      <h5>Nama</h5>
                  </th>
                  <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                      <h5>Harga</h5>
                  </th>
                  <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                      <h5>Stok</h5>
                  </th>     
                  <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                      <h5></h5>
                  </th>                                     
                  </tr>
              </thead>
              <tbody>
                  <tr
                  v-for="item in allItem"
                  :key="item._id"
                  >           
                  <td>{{ item.kodeBarang }}</td>
                  <td>{{ item.nama }}</td>
                  <td>Rp {{getRp(item.harga) }}</td>
                  <td>{{ item.stok }}</td>
                  <td>
            
                    <v-btn
                        color="green"
                        class="ma-2 white--text"
                        @click="tambahItem(item)"
                        >                
                        <v-icon
                            left
                            dark
                        >
                            mdi-plus-thick
                        </v-icon>
                    </v-btn>
                    <!-- <a @click="tambahItem(item)">
                        <v-icon color="green" v-b-popover.hover.top="'Tambah Item'" dense>mdi-cart-plus</v-icon>
                    </a>  -->
                  </td>
                  
                  </tr>
              </tbody>
              </template>
          </v-simple-table>   
        <!-- tabel item -->
        
        <!-- loading -->
        <v-container style="height: 400px;" v-if="loading">            
          <v-row
              class="fill-height"
              align-content="center"
              justify="center"
          >
              <v-col cols="6">
              <v-progress-linear
                  color="black darken-2"
                  indeterminate
                  rounded
                  height="6"
              ></v-progress-linear>
              </v-col>
          </v-row>
        </v-container> 	
        <!-- loading -->


      
  </div>

</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import Swal from 'sweetalert2'
  import axios from 'axios'


  export default {
    data() {
      return {
          allKategori:[{ item: '-', name: '-' }],
          kategoriPilih:'-',
          allMerkKaca:[{ item: '-', name: '-' }],
          merkKacaPilih:'-',
          allMerkMobil:[{ item: '-', name: '-' }],
          merkMobilPilih:'-',

          // search
          src:'',

          // form + item
          dialog: false,
          dialog2:false,
          loading2: false,
          id: "",
          nama : "",
          harga: 0,
          stok: 0,
          kodeBarang: "",
          kategori: "",
          merkKaca: "",
          merkMobil: "",
          deskripsi: ""
      }
    },
    components:{

    },
    computed:{  
          ...mapGetters({
              allItem: 'item/getAllItem',
              totalItem: 'item/getTotalItem',
              loading: 'item/getLoading',
              getKategori: 'kategori/getKategori',
              getMerkMobil: 'kategori/getMerkMobil',
              getMerkKaca: 'kategori/getMerkKaca'
          }),          
          getRole(){
              return this.$store.state.userRole
          },
          getLength(){
              return this.allItem.length
          }           
    },    
    methods:{  
          ...mapMutations({
          fillData: 'item/fillData',
          fillTotal: 'item/fillTotal',  
          fillLoading: 'item/fillLoading'        
          }),            
          ...mapActions({
              fetchItem: 'item/fetchAction',
              fetchKetegori: 'kategori/fetchKategori',
              fetchMerkMobil: 'kategori/fetchMerkMobil',
              fetchMerkKaca: 'kategori/fetchMerkKaca',
              addItem: 'cart/addItem'
          }),               
          getRp(text){
              if(text){
                  var number_string = text.toString()
                  var sisa 	= number_string.length % 3,
                      rupiah 	= number_string.substr(0, sisa),
                      ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                          
                  if (ribuan) {
                      text = sisa ? '.' : '';
                      rupiah += text + ribuan.join('.');
                  }            
      
                  return rupiah
              }
          },             
          formatRupiahEsc(angka){
              let al = "";
              if(angka=="" || angka==null || angka=="null" || angka==undefined){
                  al = "";
              } else {
                  al = Math.abs(angka.replace(/[^,\d]/g, '').toString());
              }
              return al;
          },               
          search(page){          
              if(this.src === ''){
                      this.fetchItem(1,10)
              } else{
                  if(page === 1){
                  this.currentPage = 1
                  }         
                  this.fillLoading(true)
                  this.fillData([])
                  axios({
                  url: `${this.$store.state.url}/item/search2?src=${this.src}&page=${this.currentPage}&limit=10`,
                  method: 'get',
                  headers:{
                      token : localStorage.getItem('token')
                  }
                  })      
                      .then(({data})=>{    
                            if(data.results.length === 1){
                                this.tambahItem(data.results[0])
                            }
                            this.fillTotal(data.Total)
                            this.fillData(data.results)
                            this.fillLoading(false)                                                                      
                      })
                      .catch(err=>{
                          console.log(err)
                      })        
              }         
              },                    
          tambahItem(data){
                this.src = ''
                let temp = {
                    id: data._id,
                    nama: data.nama,
                    kodeBarang: data.kodeBarang,
                    qty: 1,
                    stok:data.stok,
                    harga: data.harga
                }
                this.addItem(temp)          
          },    
        
    },
    watch:{
          harga: function(){
              if(this.harga){
              var number_string = this.harga.replace(/[^,\d]/g, '').toString()
              var sisa 	= number_string.length % 3,
                  rupiah 	= number_string.substr(0, sisa),
                  ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                      
              if (ribuan) {
                  this.harga = sisa ? '.' : '';
                  rupiah += this.harga + ribuan.join('.');
              }            
  
              this.harga = rupiah
              } 
          },
          getKategori: function(){
              if(this.getKategori.length > 0){
                  this.getKategori.forEach(element => {
                      this.allKategori.push({ item: element._id, name: element.nama })
                  });
              }
          },
          getMerkMobil: function(){
              if(this.getMerkMobil.length > 0){
                  this.getMerkMobil.forEach(element => {
                      this.allMerkMobil.push({ item: element._id, name: element.nama })
                  });
              }
          },            
          getMerkKaca: function(){
              if(this.getMerkKaca.length > 0){
                  this.getMerkKaca.forEach(element => {
                      this.allMerkKaca.push({ item: element._id, name: element.nama })
                  });
              }
          },               
    },
    created(){
      this.fetchItem(1,10)
    }
  }
</script>