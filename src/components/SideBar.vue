<template>
    <div>  
      <div v-if="isLogin"> 
        <div>
          <b-navbar toggleable="lg" type="dark" class="nav">
            
            <b-navbar-brand @click.stop="drawer = true" style="cursor: pointer;margin-left: 10px;">
              <b-icon icon="list" font-scale="1"></b-icon> menu
            </b-navbar-brand>
            
            <b-navbar-toggle target="nav-collapse">
            </b-navbar-toggle>
            
            <b-collapse id="nav-collapse" is-nav style="margin-right: 10px;">
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <template #button-content>
                    <em><b-avatar size="sm"></b-avatar> {{userName}}</em>
                  </template>
                  <b-dropdown-item @click.prevent="openPengaturan()">
                    <b-icon icon="gear-fill" aria-hidden="true" ></b-icon> Pengaturan
                  </b-dropdown-item>
                  <b-dropdown-item @click.prevent="logOut()">
                    <b-icon icon="box-arrow-left" aria-hidden="true" ></b-icon> Logout
                  </b-dropdown-item>                
                </b-nav-item-dropdown>             
              </b-navbar-nav>
            </b-collapse>

          </b-navbar>
  
          <!-- side bar -->
          <v-navigation-drawer
            v-model="drawer"
            class="grey darken-3"
            dark
            app
            clipped
            fixed
            temporary
            style="position:fixed; top:0; left:0;">            
            <v-divider></v-divider>
            
            <v-list>
              <!-- <v-list-item link @click="$router.push('/')" v-if="getRole === 'Super'">
                  <v-list-item-icon>
                    <v-icon>mdi-finance</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>DASHBOARD</v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->
            
                <v-list-group prepend-icon="mdi-shopping" v-if="getRole === 'Super' ">
                  <template v-slot:activator>
                    <v-list-item-title>PRODUK</v-list-item-title>
                  </template>
    
                  <v-list-item link class="ml-14" @click="$router.push('/item')" v-if="getRole === 'Super' ">
                    <v-list-item-icon>
                      <v-icon>mdi-basket</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>ITEM</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
<!--     
                  <v-list-item link class="ml-14" @click="$router.push('/kategori')" v-if="getRole === 'Super' ">
                    <v-list-item-icon>
                      <v-icon>mdi-basket-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>KATEGORI</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item> -->
                </v-list-group> 

                <v-list-item link @click="$router.push('/history/stok')" v-if="getRole === 'Super' ">
                  <v-list-item-icon>
                    <v-icon>mdi-store-clock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>HISTORY STOK</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="$router.push('/supplier')" v-if="getRole === 'Super' ">
                  <v-list-item-icon>
                    <v-icon>mdi-briefcase-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>SUPPLIER</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>   

                <v-list-item link @click="$router.push('/customer')" v-if="getRole === 'Super' ">
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>CUSTOMER</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>   

                <!-- <v-list-item link @click="$router.push('/shift')" v-if="getRole === 'Super' ">
                  <v-list-item-icon>
                    <v-icon>mdi-account-settings</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>SHIFT</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>    -->

                <v-list-group prepend-icon="mdi-file-chart-outline" v-if="getRole === 'Super' ">
                  <template v-slot:activator>
                    <v-list-item-title>TRANSAKSI</v-list-item-title>
                  </template>
    
                  <v-list-item link class="ml-14" @click="$router.push('/penjualan')" v-if="getRole === 'Super' ">
                    <v-list-item-icon>
                      <v-icon>mdi-credit-card-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>PENJUALAN</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- <v-list-item link class="ml-14" @click="$router.push('/bon')" v-if="getRole === 'Super' ">
                    <v-list-item-icon>
                      <v-icon>mdi-credit-card-settings</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>BON</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item> -->

                  <v-list-item link class="ml-14" @click="$router.push('/pembelian')" v-if="getRole === 'Super' ">
                    <v-list-item-icon>
                      <v-icon>mdi-credit-card-check-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>PEMBELIAN</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>             
                
                <v-list-item link @click="$router.push('/pengguna')" v-if="getRole === 'Super' ">
                  <v-list-item-icon>
                    <v-icon>mdi-account-supervisor</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>PENGGUNA</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>                
            </v-list>
  
            <template v-slot:append>
              <div class="pa-2">
                <v-btn block @click.prevent="logOut"><v-icon>mdi-logout</v-icon>Logout</v-btn>
              </div>
            </template>
          </v-navigation-drawer>    
        </div>      

         <!-- form setting user login  -->
          <v-dialog
          v-model="dialog"
          max-width="400"
          >    
            <v-card     class="mx-auto">
              <v-card-title class="text-h5 grey lighten-2 mb-4">
                <b-icon icon="gear-fill" aria-hidden="true" ></b-icon> Pengaturan
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                      <v-col cols="12" md="10">
                          <v-text-field
                              v-model="username"
                              label="Username"    
                              outlined                        
                              clearable
                              v-on:keyup.enter="editUser()"
                          ></v-text-field>      
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="12" md="10">
                          <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="E-mail"
                              required
                              v-on:keyup.enter="editUser()"
                          ></v-text-field>      
                      </v-col>              
                  </v-row>
                  <v-row>
                      <v-col cols="12" md="9">                  
                        <b-button v-b-toggle.collapse-1 variant="outline-secondary">Reset Password</b-button>
                        <b-collapse id="collapse-1" class="mt-2">              
                          <v-text-field
                              v-model="password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Passoword"
                              hint="At least 6 characters"
                              counter
                              @click:append="show1 = !show1"
                              v-on:keyup.enter="editUser()"
                          ></v-text-field>
                        </b-collapse>   
                      </v-col>               
                  </v-row>                    
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Batal
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="editUser()"
                >
                  Edit
                </v-btn>
              </v-card-actions>
            </v-card>    
          </v-dialog>       
         <!-- form setting user login  -->         
       
      </div> 
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  
  export default {
    name: 'home',
    
    data(){
      return{      
        drawer: false,
          // form
          tempId: '',
          dialog: false,
          username:'',
          email:'',
          password:'',
          role:'',
  
          // rules
          emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid',
          ],
          show1: false,
          rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 6 || 'Min 6 characters',
            emailMatch: () => (`The email and password you entered don't match`),
          },      
      }
    },
    components: {
  
    },
    computed:{
      isLogin(){
        return this.$store.state.isLogin
      },    
      userName(){
        return this.$store.state.user
      },
      emailUser(){
        return this.$store.state.email
      },    
      userId(){
        return this.$store.state.userId
      },
      getRole(){
        return this.$store.state.userRole
      }
    },
    methods:{    
      openPengaturan(){
        this.username = this.userName
        this.email = this.emailUser
        this.password = ''
        this.tempId = this.userId
        this.role = this.getRole
        this.dialog = true
      },
      editUser(){
              if(this.password === ''){
                  this.password = '-'
              }
              axios({
                  url: `${this.$store.state.url}/user/editUserLogin/${this.tempId}`,
                  method: 'put',
                  headers:{
                      token : localStorage.getItem('token')
                  },
                  data:{
                      username:this.username,
                      email:this.email,
                      password:this.password,    
                      role: this.role             
                  }
                  })
                  .then(({data}) =>{
                      Swal.fire(
                        'Berhasil!',
                        'sukses edit user!',
                        'success'
                      )                      
                      localStorage.setItem('user',this.username)  
                      localStorage.setItem('email',this.email)                
                      this.$store.commit('setUser',this.username)
                      this.$store.commit('setEmail',this.email)                                    
                      this.dialog = false
                      this.username=''
                      this.email=''
                      this.password=''
                      this.role=''       
                  })
                  .catch(err=>{
                          console.log(err)
                          Swal.fire({
                          icon: 'error',
                          title: 'gagal !',
                          text: err.errors,
                          })                        
                  })         
      },        
      logOut(){
        localStorage.clear()
        this.$store.commit('setLogin', false)
        this.$store.commit('setRole', '')
        this.$router.push('/')
      },    
      
    },
    watch:{
        
    },
    created(){
  
    }
  }
  </script>
  
  <style scoped>
  body {
      color: aliceblue;
      font-family: 'Roboto', sans-serif;
  }    
  .nav {
      background: #1A2226;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  
  </style>
  