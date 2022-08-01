export function NumberCard({ value, label }) {
	return (
		<>
			<link
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.3.1/css/all.min.css"
				rel="stylesheet"
			/>

			<div className="card card-stats mb-3 mb-xl-0">
				<div className="card-body">
					<div className="row">
						<div className="col">
							<h5 className="card-title fs-6 text-uppercase text-muted mb-0">{label}</h5>
							<span className="h3 font-weight-bold mb-0">{value}</span>
						</div>
						<div className="col-auto">
							<div
								className="icon icon-shape bg-danger text-white rounded-circle shadow text-center pt-1"
								style={{
									width: 32,
									height: 32,
								}}
							>
								<i className="fas fa-chart-bar" />
							</div>
						</div>
					</div>
					{/*<p className="mt-3 mb-0 text-muted text-sm">*/}
					{/*	<span className="text-success mr-2">*/}
					{/*		<i className="fa fa-arrow-up"></i> 3.48%*/}
					{/*	</span>*/}
					{/*	<span className="text-nowrap">Since last month</span>*/}
					{/*</p>*/}
				</div>
			</div>
		</>
	);
}
