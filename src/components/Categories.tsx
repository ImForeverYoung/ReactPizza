import React from "react";
//import useWhyDidYouUpdate  from "ahooks/lib/useWhyDidYouUpdate";
type CategoriesProps = {
  value: number;
  onClickCategory: (value: number) => void;
};
const categories = [
  'Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые'
];
const Categories: React.FC<CategoriesProps> = React.memo(({value,onClickCategory}) => {
    //const [activeIndex,setActiveIndex] = React.useState(2);
    //useWhyDidYouUpdate('Categories',{value,onClickCategory});
    

    // const onClickCategory = (index) => {
    //   setActiveIndex(index);
    // }
    
    return(
      <div className="categories">
                <ul>
                  {
                    categories.map((el,index)=> (<li onClick={ () => onClickCategory(index)} className={value==index? "active" : ''}>{el}</li>))
                  }
                   
                </ul>
              </div>
    );
  });


  export default Categories