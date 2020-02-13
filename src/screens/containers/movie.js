import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieLayout from '../components/movie_layout';
import Player from '../../player/containers/player';
import Details from '../../videos/components/details';

class Movie extends Component {
	onExitVideo = () => {
		this.props.dispatch({
			type: 'SET_SELECTED_MOVIE',
			payload: {
				movie: null
			}
		})
	}
	render() {
		return (
			<MovieLayout>
				<Player
					onExit={this.onExitVideo} />
				<Details {...this.props.movie} />
			</MovieLayout>
		)
	}
}

function mapStateToProps(state) {
	return {
		movie: state.selectedMovie
	}
}

export default connect(mapStateToProps)(Movie);
