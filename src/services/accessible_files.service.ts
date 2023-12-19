import apiWithAuth from "@/configs/axios/axios.config";
import type { IOtherFile } from "@/models/file.model";
import type { IParamsSearch } from "@/models/params.model";

class AccessibleFilesService {
	private static pathDefault = "/files";

	static async getFiles(params?: IParamsSearch): Promise<IOtherFile[] | null> {
		try {
			const files = await apiWithAuth.get<IOtherFile[]>(`${this.pathDefault}/to_me`, {
				params,
			});

			return files.data;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default AccessibleFilesService;
