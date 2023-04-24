export function content_list_page(type, index) {
	if (type == 2) {
		return 10;
	}
	switch (index) {
		case 'chl':
			return 8;
		case 'lar':
			return 8;
		case 'pfnl':
			return 8;
		case 'payz':
			return 8;
		case 'gac':
			return 5;
		default:
			return 10;
	}
}
