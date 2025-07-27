# Use the official Documenso image as base
FROM documenso/documenso:latest

# Copy our production signing certificate
COPY certs/cert.p12 /opt/documenso/cert.p12

# Set the signing configuration
ENV NEXT_PRIVATE_SIGNING_TRANSPORT=local
ENV NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH=/opt/documenso/cert.p12
ENV NEXT_PRIVATE_SIGNING_PASSPHRASE=matchbook-secure-2024

# Set upload to database (no external storage needed)
ENV NEXT_PUBLIC_UPLOAD_TRANSPORT=database

# Expose port
EXPOSE 3000

# Use the default start command from documenso image