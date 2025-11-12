import { BASE_URL } from "@/libs/baseUrl";
import axios from "axios";
export default axios.create({ baseURL: BASE_URL });
