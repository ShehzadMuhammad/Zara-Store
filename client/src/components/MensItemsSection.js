import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ViewItemDialog from './ViewItemDialog';

import { connect } from 'react-redux';
import { getMensItems } from '../actions/mensItemsActions';

import './Section.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



class MensItemsSection extends Component {

	componentDidMount(){
		this.props.getMensItems();
	}

	render(){
		const { mensItems } = this.props.mensItem;
		return(
			<div className={styles.root}>

				<Grid container spacing={24}>
			 		{ mensItems && mensItems.map(({_id, itemName, image, description, price}) => (

			 		<Grid item xs={12} sm={6}>
			 			<Paper className={styles.paper}>
				 		 	<h1>{itemName}</h1>
				 		 	 <h3>${price}</h3>
				 		 	 <img className="sectionImage" src={image} alt="" />
				 		 	 <ViewItemDialog id={_id} itemName={itemName} description={description} price={price} image={image} />
				 		 </Paper>
		             </Grid>
			  		))}
			 	</Grid>
			</div>
		);
	}
}

MensItemsSection.propTypes = {
	getMensItems: PropTypes.func.isRequired,
	mensItem: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	mensItem: state.mensItem
});

export default withStyles(styles)(connect(
	mapStateToProps, 
	{ getMensItems }
)(MensItemsSection));
