// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import { Grid, makeStyles, TextField } from '@material-ui/core';
// import Pagination, { usePagination } from '@material-ui/lab/Pagination';
// import { Layout } from '../../components/layout/layout';
// import Pokemon from '../../components/pokemon/pokemon'
// import './pokemons.css'
// import { loadAllPokemons, loadPaginatedPokemons, loadPokemons } from '../pokemons/actions';
// import { forwardTo } from '../../lib/utils';


// const useStyles = makeStyles((theme) => {
//   return {
//     button: {
//       backgroundColor: theme.palette.grey
//     },
//     buttonOfPagination: {
//       position: 'absolute',
//       width: 'auto',
//       height: 30,
//       right: 10,
//       top: '50%',
//       borderRadius: 50,
//       transform: `translateY(-50%)`,
//       zIndex: 999
//     }
//   }
// })

// const AllPokemons = () => {
//   const classes = useStyles()
//   const dispatch = useDispatch()
//   const history = useHistory()
//   const pokemons = useSelector(state => state.pokemons.pokemons)
//   const pokemonsData = useSelector(state => state?.pokemons?.pokemonsData)
//   const [pokemonsState, setPokemonsState] = useState(null)
//   const pokemonsCount = Math.floor(pokemonsData?.count / 20)
//   const lsPageNum = localStorage.getItem('page')
//   console.log('lsPageNum', lsPageNum)
//   const initPage = lsPageNum || 1
//   const [page, setPage] = useState(initPage);
//   const [isClicked, setIsClicked] = useState(false)
//   const pokemonStateClass = pokemonsState ? 'pokemons-exist' : 'pokemons-unexist'
//   const newClass = pokemonsState ? 'auto-grid' : ''
//   console.log('localStoragePokemons', pokemonsCount)
//   // console.log('INFOOO1')

//   useEffect(() => {
//     getAllPokemonsPerPagination(page)
//     history.push(`/pokemons/${page}`)
//   }, [])

//   useEffect(() => {
//     getAllPokemonsPerPagination(page)
//     history.push(`/pokemons/${page}`)
//   }, [])

//   useEffect(() => {
//     setPokemonsState(pokemons)
//   }, [pokemons])

//   const getAllPokemonsPerPagination = (pageNum) => {
//     // dispatch(loadPokemons())
//     dispatch(loadPaginatedPokemons(pageNum, false))
//   }

//   const getAllPokemons = () => {
//     dispatch(loadAllPokemons(1100))
//   }

//   const handleChangePage = (event, pageNum) => {
//     setPage(+pageNum)
//     console.log('event, pageNum', event, pageNum)
//     localStorage.setItem('page', `${pageNum}`)
//     history.push(`/pokemons/${pageNum}`)
//     dispatch(loadPaginatedPokemons(pageNum))
//   };

//   const showAllHandler = (dir) => {
//     if (dir === 'all') {
//       setIsClicked(true)
//       getAllPokemonsPerPagination(page)
//       history.push(`/${dir}`)
//     }
//   }

//   const showPiecesHandler = (dir) => {
//     if (dir === 'pieces') {
//       setIsClicked(false)
//       getAllPokemons()
//       history.push(`/pokemons/${page}`)
//     }
//   }

//   console.log('infooo11 222', pokemonsState, page)
//   console.log('infooo11 99999', isClicked)
//   return (
//     <Layout>
//       <TextField id="filled-basic" className="pokemons-input" label="Search Pokemon per name" variant="filled" />
//       <div className={`pokemons ${pokemonStateClass}`}>
//         <div className={`pokemons-wrapper ${newClass}`}>
//           <Pokemon pokemon={pokemonsState} />
//         </div>
//         <div className="pokemons-pagination">
//           <Pagination 
//             key={`page-${page}`}
//             disabled={isClicked}
//             defaultPage={+page}
//             className="pokemons-pagination" 
//             color="primary" 
//             count={pokemonsCount}
//             onChange={(e, a) => handleChangePage(e, a)}
//           />
//           { !isClicked ?
//             <Button 
//               variant="contained" 
//               color="primary" 
//               className={classes.buttonOfPagination}
//               onClick={ () => showAllHandler('all') }
//             >
//               All
//               {/* { !isClicked ? 'All' : '← Back to Pagination' } */}
//             </Button>
//           :
//             <Button 
//               variant="contained" 
//               color="grey"
//               className={classes.buttonOfPagination}
//               onClick={ () => showPiecesHandler('pieces') }
//             >
//               ← Back to Pagination
//               {/* { !isClicked ? 'All' : '← Back to Pagination' } */}
//             </Button> }
//         </div>
//       </div>
//     </Layout>
//   );
// }
 
// export default AllPokemons;