/**
 * 
 * To do:
 * formatting on the screen so it's not all bunched
 * options for various outputs
 * styling
 * 
 */
( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;

	blocks.registerBlockType( 'karmatosed/knit-block', {
		title: i18n.__( 'Knitting Pattern', 'knit-block' ),
		icon: 'index-card',
		category: 'layout',
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			materials: {
				type: 'array',
				source: 'children',
				selector: '.materials',
			},
			pattern: {
				type: 'array',
				source: 'children',
				selector: '.pattern',
			},
		},
		edit: function( props ) {
			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			return (
				el( 'div', { className: props.className },
					el( RichText, {
						tagName: 'h2',
						inline: true,
						placeholder: i18n.__( 'Pattern title', 'knit-block' ),
						value: attributes.title,
						onChange: function( value ) {
							props.setAttributes( { title: value } );
						},
					} ),
					el( 'div', { className: 'pattern-image' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'image-button' : 'button button-large',
										onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image', 'knit-block' ) : el( 'img', { src: attributes.mediaURL } )
								);
							}
						} )
					),
					el( 'h3', {}, i18n.__( 'Materials', 'knit-block' ) ),
					el( RichText, {
						tagName: 'ul',
						multiline: 'li',
						placeholder: i18n.__( 'What do you need for this pattern?', 'knit-block' ),
						value: attributes.materials,
						onChange: function( value ) {
							props.setAttributes( { materials: value } );
						},
						className: 'materials',
					} ),
					el( 'h3', {}, i18n.__( 'Pattern', 'knit-block' ) ),
					el( RichText, {
						tagName: 'div',
						inline: false,
						placeholder: i18n.__( 'How do you make this?', 'knit-block' ),
						value: attributes.pattern,
						onChange: function( value ) {
							props.setAttributes( { pattern: value } );
						},
					} )
				)
			);
		},
		save: function( props ) {
			var attributes = props.attributes;

			return (
				el( 'div', { className: props.className },
					el( RichText.Content, {
						tagName: 'h2', value: attributes.title
					} ),
					attributes.mediaURL &&
						el( 'div', { className: 'pattern-image' },
							el( 'img', { src: attributes.mediaURL } ),
						),
					el( 'h3', {}, i18n.__( 'Materials', 'knit-block' ) ),
					el( RichText.Content, {
						tagName: 'ul', className: 'materials', value: attributes.materials
					} ),
					el( 'h3', {}, i18n.__( 'Pattern', 'knit-block' ) ),
					el( RichText.Content, {
						tagName: 'div', className: 'pattern', value: attributes.pattern
					} ),
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
