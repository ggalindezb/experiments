# XX.zip                   : features for country with iso code XX, see 'geoname' table for columns. 'no-country' for features not belonging to a country.
# allCountries.zip         : all countries combined in one file, see 'geoname' table for columns
# cities500.zip            : all cities with a population > 500 or seats of adm div to PPLA4 (ca 185.000), see 'geoname' table for columns
# cities1000.zip           : all cities with a population > 1000 or seats of adm div to PPLA3 (ca 130.000), see 'geoname' table for columns
# cities5000.zip           : all cities with a population > 5000 or PPLA (ca 50.000), see 'geoname' table for columns
# cities15000.zip          : all cities with a population > 15000 or capitals (ca 25.000), see 'geoname' table for columns
# alternateNamesV2.zip     : alternate names with language codes and geonameId, file with iso language codes, with new columns from and to
# alternateNames.zip       : obsolete use V2, this file does not have the new columns to and from and will be removed in the future
# admin1CodesASCII.txt     : names in English for admin divisions. Columns: code, name, name ascii, geonameid
# admin2Codes.txt          : names for administrative subdivision 'admin2 code' (UTF8), Format : concatenated codes <tab>name <tab> asciiname <tab> geonameId
# iso-languagecodes.txt    : iso 639 language codes, as used for alternate names in file alternateNames.zip
# featureCodes.txt         : name and description for feature classes and feature codes
# timeZones.txt            : countryCode, timezoneId, gmt offset on 1st of January, dst offset to gmt on 1st of July (of the current year), rawOffset without DST
# countryInfo.txt          : country information : iso codes, fips codes, languages, capital ,...
#                            see the geonames webservices for additional country information,
#                                 bounding box                         : http://api.geonames.org/countryInfo?
#                                 country names in different languages : http:/api.geonames.org/countryInfoCSV?lang=it
# modifications-<date>.txt : all records modified on the previous day, the date is in yyyy-MM-dd format. You can use this file to daily synchronize your own geonames database.
# deletes-<date>.txt       : all records deleted on the previous day, format : geonameId <tab> name <tab> comment.

# alternateNamesModifications-<date>.txt : all alternate names modified on the previous day,
# alternateNamesDeletes-<date>.txt       : all alternate names deleted on the previous day, format : alternateNameId <tab> geonameId <tab> name <tab> comment.
# userTags.zip		: user tags , format : geonameId <tab> tag.
# hierarchy.zip		: parentId, childId, type. The type 'ADM' stands for the admin hierarchy modeled by the admin1-4 codes. The other entries are entered with the user interface. The relation toponym-adm hierarchy is not included in the file, it can instead be built from the admincodes of the toponym.
# adminCode5.zip		: the new adm5 column is not yet exported in the other files (in order to not break import scripts). Instead it is availabe as separate file.
# 			  columns: geonameId,adm5code<Paste>

# Collections available:
# allCountries.zip
# cities500.zip
# cities1000.zip
# cities5000.zip
# cities15000.zip
# alternateNamesV2.zip
# alternateNames.zip
# admin1CodesASCII.txt
# admin2Codes.txt
# iso-languagecodes
# featureCodes.txt
# timeZones.txt
# countryInfo.txt
# userTags.zip
# hierarchy.zip
# adminCode5.zip
require 'net/http'

class Data::Import
  DOMAIN = 'http://download.geonames.org/'.freeze
  PATH = 'export/dump/'.freeze

  class << self
    def fetch(data_filename)
      file = open("tmp/#{data_filename}", 'w')

      Net::HTTP.start(DOMAIN) do |http|
        begin
          http.request_get(DOMAIN + PATH + data_filename) do |response|
            response.read_body do |segment|
              file.write(segment)
            end
          end
        ensure
          file.close()
        end
      end
    end
  end
end

Data::Import.fetch('countryInfo.txt')
