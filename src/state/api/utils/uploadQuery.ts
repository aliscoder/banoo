import { getItem } from "@utils";
import axios from "axios";
import { FileSystemUploadType, uploadAsync } from "expo-file-system";

export async function uploadQuery<T>(params: {
  endpoint: string;
  fileName: string;
  file?: any;
  extraData?: T;
}) {
  let token = await getItem("token");
  if (params.file) {
    try {
      const res = await uploadAsync(params.endpoint, params.file, {
        httpMethod: "POST",
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: params.fileName,
        headers: { authorization: `${token}` },
        parameters: params.extraData && {
          data: JSON.stringify(params.extraData),
        },
      });

      return { data: JSON.parse(res.body) };
    } catch (err) {
      return { error: err };
    }
  } else {
    try {
      const res = await axios.post(
        params.endpoint,
        {
          data: JSON.stringify(params.extraData),
        },
        {
          headers: { authorization: token },
        }
      );
      return { data: res.data };
    } catch (error) {
      return { error };
    }
  }
}
