import React from 'react';

import accent from '../../images/accent.png'
import elantra_sport from '../../images/elantra_sport.png'
import solati from '../../images/solati.png'
import tucson from '../../images/tucson.png'

import accent_info from '../../images/accent_info.png'
import elantra_info from '../../images/elantra_info.png'
import solati_info from '../../images/solati_info.jpeg'
import tucson_info from '../../images/tucson_info.png'

const initialState = {
	cars: [
		{id: '1', title: 'Hyundai Accent', img: accent,
			body: <div><img src={accent_info} alt="Accent Info" width="700" /></div> },
		// body: <div className="car-info">
		// 	<div>
		// 		<h6 className="bold">1. Trọng lượng</h6>
		// 		<ul className="bullet">
		// 			<li>Tổng trọng tải : 24.000 kg</li>
		// 			<li>Trọng lượng bản thân: 7.300kg</li>
		// 			<li>Khoảng sáng gầm xe : 210 (mm)</li>
		// 		</ul>
		// 	</div>

		// 	<div>
		// 		<h6 className="bold">2. Động cơ</h6>
		// 		<ul className="bullet">
		// 			<li>Động cơ: Diesel 6HK1E4NC,D-core Common-rail,Turbo intercooler</li>
		// 			<li>Dung tích xylanh : 790 cc</li>
		// 			<li>Công suất cực đại : 280 (206) kW / 2400 rpm</li>
		// 			<li>Momen xoắn cực đại : 882 ( 90) Nm / 1450 rpm</li>
		// 		</ul>
		// 	</div>
		// 	</div> },
		{id: '2', title: 'Hyundai Elantra Sport', img: elantra_sport,
			body: <div><img src={elantra_info} alt="Accent Info" width="700" /></div> },
		// body: <div className="car-info">
			// <div>
				// <h6 className="bold">1. Trọng lượng</h6>
				// <ul className="bullet">
					// <li>Tổng trọng tải: 4.990 kg</li>
					// <li>Tải chở hàng: 1.990 kg.</li>
				// </ul>
			// </div>
//
			// <div>
				// <h6 className="bold">2. Động cơ</h6>
				// <ul className="bullet">
					// <li>Động cơ : Diesel 4JH1 Commonrial, phun nhiên liệu điện tử, tăng áp, làm mát khí nạp.</li>
					// <li>Dung tích xy lanh : 2.999 cc</li>
					// <li>Hộp số : 05 số tiến và 01 số lùi.</li>
				// </ul>
			// </div>
			// </div> },
		{id: '3', title: 'Hyundai Solati', img: solati,
			body: <div><img src={solati_info} alt="Accent Info" width="700" /></div> },
		// body: <div className="car-info">
			// <div>
				// <h6 className="bold">1. Trọng lượng</h6>
				// <ul className="bullet">
					// <li>Tổng trọng tải : 16.000 kg</li>
					// <li>Trọng lượng bản thân:375kg</li>
					// <li>Khoảng sáng gầm xe : 210 (mm)</li>
				// </ul>
			// </div>
//
			// <div>
				// <h6 className="bold">2. Động cơ</h6>
				// <ul className="bullet">
					// <li>Động cơ: Diesel 6HK1E4NC,D-core Common-rail,Turbo intercooler</li>
					// <li>Dung tích xylanh : 790 cc</li>
					// <li>Công suất cực đại : 241 (177) kW / 2400 rpm</li>
					// <li>Momen xoắn cực đại : 706 ( 72) Nm / 1450 rpm</li>
				// </ul>
			// </div>
			// </div> },
		{id: '4', title: 'Hyundai Tucson', img: tucson,
			body: <div><img src={tucson_info} alt="Accent Info" width="700" /></div> },
		// body: <div className="car-info">
			// <div>
				// <h6 className="bold">1. Trọng lượng</h6>
				// <ul className="bullet">
					// <li>Tổng trọng tải : 23.715 kg.</li>
					// <li>Trọng lượng bản thân: 10.695 kg.</li>
					// <li>Khoảng sáng gầm xe : 210 (mm)</li>
				// </ul>
			// </div>
//
			// <div>
				// <h6 className="bold">2. Động cơ</h6>
				// <ul className="bullet">
					// <li>Động cơ: Diesel 6HK1E4NC,D-core Common-rail,Turbo intercooler</li>
					// <li>Dung tích xylanh : 790 cc</li>
					// <li>Công suất cực đại : 280 (206) kW / 2400 rpm</li>
				// </ul>
			// </div>
			// </div> },
	],
}

const carReducer = (state = initialState, action) => {
	return state
}

export default carReducer

