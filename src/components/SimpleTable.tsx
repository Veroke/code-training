import { defineComponent } from "vue";
import { type TableProps, tableProps, ListItemType } from "./types";
import axios from 'axios'
import { ref } from 'vue-demi'
import './index.less'

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {
    let isSort = false
    const headList = [
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'sex',
        label: '性别'
      },
      {
        prop: 'age',
        label: '年龄',
        isSort: true
      },
      {
        prop: 'address',
        label: '地址'
      }
    ]

    let bodyList = ref<ListItemType[]>([])
    function headClick(prop) {
      isSort = !isSort
      sort(prop, isSort ? '' : 'asc')
    }

    function getList() {
      axios('user/list').then((res) => {
        bodyList.value = res.data.list
        console.log('bodyList', bodyList.value);

      })

    }

    getList()

    // 排序
    function sort(type, order) {
      let table = document.getElementById("tbody");
      let trArr = table?.children;
      let intType;
      // TODO 目前只做了年龄的排序，后续做到自定义排序
      if (type == "age") {
        intType = 2;
      }
      let temp
      if (order == "asc") {
        for (let i = 0; i < trArr.length - 1; i++) {
          for (let j = 0; j < trArr.length - i - 1; j++) {
            if ((trArr[j].children[intType].innerHTML - 0) > (trArr[j + 1].children[intType].innerHTML - 0)) {
              temp = trArr[j].innerHTML;
              trArr[j].innerHTML = trArr[j + 1].innerHTML;
              trArr[j + 1].innerHTML = temp;
            }
          }
        }
      } else {
        for (let i = 0; i < trArr.length - 1; i++) {
          for (let j = 0; j < trArr.length - i - 1; j++) {
            if ((trArr[j].children[intType].innerHTML - 0) < (trArr[j + 1].children[intType].innerHTML - 0)) {
              temp = trArr[j].innerHTML;
              trArr[j].innerHTML = trArr[j + 1].innerHTML;
              trArr[j + 1].innerHTML = temp;
            }
          }
        }
      }
    }
    return () => {
      return (
        <table class="table">
          <thead >
            <tr class="head-tr">
              {
                headList.map(item => {
                  return <th class="head-th">
                    {item.label}
                    {
                      item.isSort && <i onClick={() => { headClick(item.prop) }}>^</i>
                    }
                  </th>
                })
              }
            </tr>
          </thead>
          <tbody id="tbody">
            {
              bodyList.value.map(item => {
                return <tr class="body-tr">
                  <td class="body-td">{item.name}</td>
                  <td class="body-td">{item.sex}</td>
                  <td class="body-td">{item.age}</td>
                  <td class="body-td">{item.address}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      );
    };
  },
});
