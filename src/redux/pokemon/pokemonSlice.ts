import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Pokemon {
  name: string;
  data: any;
}

interface PokemonState {
  pokemonList: Pokemon[];
  pokemon: {};
  searchTerm?: string;
  currentUrl: string;
  page: number;
  nextPage: string | null;
  prevPage: string | null;
  loading: boolean;
  error: string | null;
  modeColor: string;
  theme: string;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemon: [],
  searchTerm: "",
  currentUrl: "https://pokeapi.co/api/v2/pokemon?limit=8",
  page: 1,
  nextPage: null,
  prevPage: null,
  loading: false,
  error: null,
  modeColor: "primeBlue",
  theme: "theme-blue",
};

export const getAllpokemons = createAsyncThunk(
  "pokemons/getAllpokemons",
  async ({
    pageUrl,
    searchTerm,
  }: {
    pageUrl: string;
    limit: number;
    searchTerm: string;
  }) => {
    const res = await axios.get(pageUrl);
    let pokemonData;
    if (searchTerm.trim() === "") {
      pokemonData = res.data.results;
    } else {
      pokemonData = res.data.results.filter((p: any) =>
        p.name.includes(searchTerm)
      );
    }

    const pokemonDetails = await Promise.all(
      res.data.results.map((p: any) => axios.get(p.url))
    );
    return pokemonDetails.map((p: any) => ({
      name: p.data.name,
      data: p.data,
      next: res.data.next,
      prev: res.data.previous,
    }));
  }
);

export const getPokemonDetails = createAsyncThunk(
  "pokemon/getPokemonDetails",
  async (id: string) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setModeColor: (state, action) => {
      state.modeColor = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllpokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllpokemons.fulfilled, (state, action) => {
        state.pokemonList = action.payload;
        const lastPokemon = action.payload[action.payload.length - 1];
        state.nextPage = lastPokemon?.next || null;

        state.prevPage = lastPokemon?.prev || null;
        state.loading = false;
      })
      .addCase(getAllpokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(getPokemonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemonDetails.fulfilled, (state, action) => {
        state.pokemon = action.payload;
        state.loading = false;
      })
      .addCase(getPokemonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? null;
      });
  },
});

export const { setModeColor, setTheme } = pokemonSlice.actions;

export default pokemonSlice.reducer;
