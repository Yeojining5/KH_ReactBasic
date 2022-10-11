import axios from "axios"

export const jsonDeptList = (params) => {
  return new Promise((resolve, reject) => {
    try{
      const response = axios({
        method : "get",
        url : process.env.REACT_APP_SPRING_IP + "dept/jsonDeptList",
        params : params,
      })

      resolve(response)
        
    }catch(error) {
      reject(error)
    }
  })
}