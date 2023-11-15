---
layout: default
title: Links
---

<div id="abs-block">
	{% if site.data.links and site.data.links.size != 0 %}
		<ul>
			{% for item in site.data.links %}
				<li>
					<a href="{{ item.link }}" target="_blank">{{ item.name }}</a>
				</li>
			{% endfor %}
		</ul>
	{% else %}
		<span>No links (for now)</span>
	{% endif %}
</div>
