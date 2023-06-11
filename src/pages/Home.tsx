import React from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selector';
import { selectPizzaData } from '../redux/slices/pizzas/selector';
import { fetchPizzas } from '../redux/slices/pizzas/asyncActions';
import { SearchPizzaParams } from '../redux/slices/pizzas/types';
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  // const pizzas = useSelector(state => //from redux
  //   state.pizzas.items
  // );
  // const status = useSelector(state => //from redux
  //   state.pizzas.status
  // );
  const { items: pizzas, status } = useSelector(selectPizzaData);
  const sortType = useSelector((state: any) => state.filter.sort.sortProperty);

  const dispatch = useAppDispatch();

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const categoryIdToSend = categoryId > 0 ? `category=${categoryId}` : '';

  async function fetchData() {
    try {
      setIsLoading(true);
      window.scrollTo(0, 0);
      //const res = await axios.get(`https://642d8197bf8cbecdb4082db3.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryId > 0 ?
      //`category=${categoryId}` : '' }&sortBy=${sortType}&order=desc`)
      // asc = по возрастанию

      dispatch(
        //
        fetchPizzas({ categoryIdToSend, currentPage: String(currentPage), sortType, searchValue }),
      );
      setIsLoading(false);
    } catch (e) {
      alert('error during get request');
    } finally {
      setIsLoading(false);
    }
  }
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []); // функция создалась один раз и в последующем когда компонент Home будет перерисовываться, то это функция заново создаваться не будет

  React.useEffect(() => {
    console.log('epta -------------', window.location.search);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      console.log(params);
      const sort = sortList.find((obj) => obj.sortProperty == params.sortType);
      dispatch(
        setFilters({
          ...params,
          searchValue: params.searchValue,
          categoryId: Number(params.categoryIdToSend),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);
  // React.useEffect(()=>{

  //   fetchData();

  // }, [categoryId,sortType, searchValue,currentPage])

  React.useEffect(() => {
    console.log('epta ++++++++++++++');
    window.scrollTo(0, 0);
    //if(!isSearch.current){
    fetchData();
    //}
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    console.log('epta ??????????????????');
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, searchValue]);

  // React.useEffect(()=>{
  //   const queryString = qs.stringify({
  //     sortProperty: sortType,
  //     categoryId,
  //     currentPage,

  //   })
  //   console.log(queryString)
  //   navigate(`?${queryString}`)
  // }, [categoryId,sortType, searchValue,currentPage])

  const pizzasComps = pizzas
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase().trim())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => (
      /*<Link key={obj.id} to={`/pizza/${obj.id}`}>*/ <PizzaBlock
        key={obj.id}
        {...obj}
        onClickAdd={null}
      /> /*</Link>*/
    ));

  const skeletons = [...new Array(4)].map((item, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i: number) => onChangeCategory(i)} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status == 'error' ? (
        <div className="content__error-info">
          <h2>Произошла Ошибка</h2>
          <p>В доступе отказано. Попробуйте позднее!</p>
        </div> // OR
      ) : (
        <div className="content__items">{status == 'loading' ? skeletons : pizzasComps}</div>
      )}
      <div className='content__pagination_wrapper'>
        <Pagination
          currentPage={currentPage}
          onChangePage={(number: number) => onChangePage(number)}
        />
      </div>
    </div>
  );
};
export default Home;
