import { useContext, useEffect, useReducer, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import { searchContextDispatch, searchContextState, incrementPage } from '../contexts/searchContext';
const ADD_ITEMS = 'ADD_ITEMS';
const SET_ITEMS = 'SET_ITEMS';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_ERROR = 'SET_ERROR';

enum ActionType {
  ADD_ITEMS,
  SET_ITEMS,
  SET_IS_LOADING,
  SET_ERROR,
}
interface ActionAddItems {
  type: ActionType.ADD_ITEMS;
  value: {
    items: string[];
  }
}

interface ActionSetItems {
  type: ActionType.SET_ITEMS;
  value: {
    items: string[];
    total: number;
  }
}

interface ActionSetIsLoading {
  type: ActionType.SET_IS_LOADING;
}

interface ActionSetError {
  type: ActionType.SET_ERROR;
  value: {
    errorMessage: string;
  }
}

type Actions = ActionAddItems | ActionSetItems | ActionSetIsLoading | ActionSetError;

interface State {
  isLoading: boolean;
  errorMessage?: string | null;
  items: string[];
  total: number;
}

const initial: State = {
  isLoading: false,
  errorMessage: null,
  items: [],
  total: 0,
};

const reducer = (state: State, action: Actions) => {
  if (action.type === ActionType.ADD_ITEMS) {
    return {
      ...state,
      isLoading: false,
      items: [...state.items, ...action.value.items],
    };
  }

  if (action.type === ActionType.SET_ITEMS) {
    return {
      isLoading: false,
      items: action.value.items,
      total: action.value.total,
    };
  }

  if (action.type === ActionType.SET_IS_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === ActionType.SET_ERROR) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.value.errorMessage,
    };
  }
  return state;
};

const areMoreItemsAvailable = (from: number, size: number, total: number) => from + size < total;

export const useSearchEngine = ({ pageSize } = { pageSize: 12 }) => {
  const [{ items, total, isLoading, errorMessage }, dispatch] = useReducer(reducer, initial);
  const dispatchGlobal = useContext(searchContextDispatch);
  const { filterCategories, filterDevelopmentStatuses, filterIntendedAudiences, page, type, searchValue, sortBy } =
    useContext(searchContextState);
  // This feature is mainly used by the infiniteScroll to reload the previous items just after an user click on the browser back button
  const reloadItemsUntilPage = useRef(page > 0 ? page : false);
  // If we aren't in the "resume mode" the from is incremental
  const from = reloadItemsUntilPage.current ? 0 : page * pageSize;
  // If we aren't in the "resume mode" use the default page size
  const size = reloadItemsUntilPage.current ? (reloadItemsUntilPage.current + 1) * pageSize : pageSize;

  const {
    localSearchPages: { index, store },
  } = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `);

  const fetchMore = () => {
    if (!isLoading && areMoreItemsAvailable(from, size, total)) {
      dispatchGlobal(incrementPage());
    }
  };

  const results = useFlexSearch(searchValue, index, store);

  useEffect(() => {
    dispatch({
      type: from === 0 ? SET_ITEMS : ADD_ITEMS,
      value: {
        items: results,
        total: results.length,
      },
    });
  }, [from, results]);

  return [errorMessage, items, total, fetchMore];
};
