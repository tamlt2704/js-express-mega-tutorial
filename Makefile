default:
	# run make -s. echo command will not showing
	echo "express web mega tutorial"
	echo "make clean to start from scratch"

clean:
	rm -fr `ls | grep -v "Makefile"`

check_requirement:
	node --version

init_project:
	# init empty project with default options
	npm init -y
	# get .gitignore for node project
	npx gitignore node
	# install express
	npm install --save express





