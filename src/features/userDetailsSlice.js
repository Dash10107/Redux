import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//create action 
export const createUser = createAsyncThunk("createUser",async(data,{rejectWithValue})=>{
const response = await fetch("https://663e29f4e1913c476796c4c2.mockapi.io/api/crud",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(data)
});

try {
const result = await response.json();
return result;
}catch(err){
    console.log('Err',err);
    return rejectWithValue(err);
}
});

//read action
 export const showUser = createAsyncThunk("showUser",async(data,{rejectWithValue})=>{
    const response = await fetch("https://663e29f4e1913c476796c4c2.mockapi.io/api/crud");
    
    try {
    const result = await response.json();
    return result;
    }catch(err){
        console.log('Err',err);
        return rejectWithValue(err);
    }

 }) 
 //read action
 export const deleteUser = createAsyncThunk("deleteUser",async(data,{rejectWithValue})=>{
  const response = await fetch(`https://663e29f4e1913c476796c4c2.mockapi.io/api/crud/${data}`,  { method: "DELETE" });
  
  try {
  const result = await response.json();
  return result;
  }catch(err){
      console.log('Err',err);
      return rejectWithValue(err);
  }

}) 

//update action
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(
      `https://663e29f4e1913c476796c4c2.mockapi.io/api/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userDetail = createSlice({
    name:"userDetail",
    initialState:{
        users:[],
        loading:false,
        error:null,
    },
    reducers: {
      searchUser: (state, action) => {
        console.log(action.payload);
        state.searchData = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.loading = false;
          state.users.push(action.payload);
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        .addCase(showUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(showUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(showUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          })
          .addCase(deleteUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
              state.users = state.users.filter((ele) => ele.id !== id);
            }
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          })
          .addCase(updateUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele) =>
              ele.id === action.payload.id ? action.payload : ele
            );
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          })
          ;

    },
});

export default  userDetail.reducer;


export const { searchUser } = userDetail.actions;