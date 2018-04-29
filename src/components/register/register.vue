

<script>
import loginService from './registerService.js';
import registerService from './registerService.js';

export default {
    template:require('./register.html'),
    data () {
        return {
            fields: {
                    // _id: {
                    //     label: 'id'
                    // },
                    groceries_name: {
                        label: 'Groceries Name',
                        sortable: true
                    },
                    quantity: {
                        label: 'Quantity',
                        sortable: true
                    },
                    category: {
                        label: 'category',
                    },
                    
                },
            modal_fields: {
                groceries_name: {
                    label: 'Groceries Name',
                    sortable: true
                },
                show_details: {
                    label: 'show_details'
                }
            },
            fridges1: [],
            fridges2: [],
            groceries_data: {
                groceries_name:'',
                quantity:1,
                category:''
            },
            groceriesDatas: {},
            rowData:''
        }
    },
    methods: {
        groceriesRegister:function() {
            let _self = this;
            registerService.register(this.groceries_data)
            .then(function(res) {
                console.log(res)
                // _self.getGroceries();
            })
        },
        getGroceries:function() {
            let _self = this;
            registerService.getGroceries()
            .then(function(res) {
                var data = res.groceries
                for(var i=0; i< data.length; i++){
                    if(data[i].category == 'fridge1') {
                    console.log(data[i])
                        _self.fridges1.push({ isActive: true, _id:data[i]._id, groceries_name:data[i].groceries_name, quantity:data[i].quantity, category:data[i].category })
                    }else if(data[i].category == 'fridge2') {
                        _self.fridges2.push({ isActive: true, _id:data[i]._id, groceries_name:data[i].groceries_name, quantity:data[i].quantity, category:data[i].category })
                    }
                }
                
            })
            
        },
        updateFridge: function(val, type) {
            let fridge = type ? this.fridges1 : this.fridges2;
            let tempFridge = [];
            for (var i in fridge) {
                if (fridge[i] == val){
                    continue;
                }
                tempFridge.push(fridge[i]);
            }
            if (type){
                val.category = 'fridge2';
                this.fridges1 = tempFridge;
                this.fridges2.push(val);
            } else {
                val.category = 'fridge1';
                this.fridges2 = tempFridge;
                this.fridges1.push(val);
            }
        },
        getRow:function(rowData) {
            let _self = this;
            console.log(rowData)
            _self.rowData = rowData;
            
        },
        MoveFridge2:function() {
            let _self = this;
            var val = _self.rowData;
            if(val.category == 'fridge1') {
                this.updateFridge(val, true);
            }else {
                this.updateFridge(val, false);
            }
        },
        MoveFridge1:function() {
            let _self = this;
            var val = _self.rowData;
            if(val.category == 'fridge1') {
                this.updateFridge(val, true);
            }else {
                this.updateFridge(val, false);
            }
        },
        MovedSave:function() {
            let _self = this;
            var changedDatas = [];
            for(var i in _self.fridges1) {
                changedDatas.push(_self.fridges1[i])
            }
            for(var j in _self.fridges2) {
                changedDatas.push(_self.fridges2[j])
            }
            
            registerService.movedSave(changedDatas)
            .then(function(res) {
                console.log(res)
            })
        }
    },
    mounted() {
        // console.log(this)
        this.getGroceries();
    },
    watch: {
        // rowData: function (val) {
        //     if(val.category == 'fridge1') {
        //         this.updateFridge(val, true);
        //     }else {
        //         this.updateFridge(val, false);
        //     }
        // }
    }
    // computed: {
    //     getGroceries(){

    //     }
    // }
}
</script>

<style lang="scss">
    @import './register.scss';
</style>