# Use a base image with Python and Conda
FROM continuumio/miniconda3

# Set the working directory inside the container
WORKDIR /app

# Copy the environment.yml file to the working directory
COPY environment.yml ./

# Create the conda environment from the environment.yml file
RUN conda env create -f environment.yml

# Activate the conda environment
RUN echo "source activate myflaskenv" > ~/.bashrc
ENV PATH /opt/conda/envs/myflaskenv/bin:$PATH

# Copy the application code to the container
COPY . .

EXPOSE 8080

# Set the command to run your Flask app
CMD ["python", "app.py"]
