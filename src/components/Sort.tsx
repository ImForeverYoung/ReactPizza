import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SortPropertyEnum } from "../redux/slices/filter/types";
import { setSort } from "../redux/slices/filter/slice";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

type PopupClick = MouseEvent & {
  path: Node[];
}
type SortParams = {
  value: any;
}
export const sortList: SortItem[] = [{name: 'популярности', sortProperty: SortPropertyEnum.RATING},
 {name: 'цене', sortProperty: SortPropertyEnum.PRICE}, 
 {name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE}];

const Sort: React.FC<SortParams> = React.memo(({value}) => {
  const dispatch = useDispatch();
  //const sort = useSelector(selectSort)
  const [isVisible,setIsVisible] = React.useState(false);
  //const [selected, setSelected] = React.useState(0);
  const sortRef = React.useRef<HTMLDivElement>(null); // типизирование и установление значения по умолчанию null
  
  const onClickSort = (el: SortItem) => {
    dispatch(setSort(el));
  }
  React.useEffect(()=> {
    const handleClickOutsideComponent = (event: MouseEvent) => {
      const _event = event as PopupClick;
      // if(!event.composedPath().includes(sortRef.current)) {
      //   setIsVisible(false);
      // }
      // const arr = _event.path || [];
      // console.log(_event.composedPath());
      if(sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
      //console.log(document.body)
    };

    document.body.addEventListener("click",handleClickOutsideComponent)
    return () => { // component did unmount
      document.body.removeEventListener("click",handleClickOutsideComponent)
    };
  }, []);
    return(
      <div ref={sortRef} className="sort">
                <div className="sort__label">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                      fill="#2C2C2C"
                    />
                  </svg>
                  <b>Сортировка по:</b>
                  <span onClick={()=>setIsVisible(!isVisible)}>{value.name}</span>
                </div>
                {
                  isVisible && (<div className="sort__popup">
                  <ul>
                        {
                          sortList.map((el,index)=>(<li key={index}
                            onClick={()=>{onClickSort(el);
                                          setIsVisible(!isVisible);
                            }} 
                            className={value.sortProperty == el.sortProperty? `active`: ``}>
                              {el.name}</li>))
                        } 
                  </ul>
                </div>)
                }
                
              </div>
    );
});


export default Sort;
