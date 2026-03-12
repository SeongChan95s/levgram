export type FetchResponse<T = void> = T extends void
	? {
			success: boolean;
			message: string;
	  }
	:
			| {
					success: true;
					message: string;
					data: T;
			  }
			| {
					success: false;
					message: string;
			  };
