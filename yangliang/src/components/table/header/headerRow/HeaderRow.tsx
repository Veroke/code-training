import { defineComponent, onMounted } from "vue";
import './headerRow.css';
import { HeaderRowProps } from "../../../types";
import Cell from '../../cell/Cell';
import { addLog } from "../../../../log/log";



export default defineComponent({
    name: "HeaderRow",
    props: [
        'columns',
        'sorter'
    ],
    setup(props: HeaderRowProps, { attrs, emit, slots }) {
      onMounted(()=>{
        addLog({
          level: "info",
          message: {
            component: "HeaderRowProps",
            props,
            msg: 'Some One Use HeaderRowProps Component'
          }
        })
      })
      const cells = props.columns.map(
          cell => <Cell key={cell.dataKey} column={cell} component="th" sorter={props.sorter} />
      )
      return () => {
        return (
          <tr>
            {cells}
          </tr>
        );
      };
    },
});